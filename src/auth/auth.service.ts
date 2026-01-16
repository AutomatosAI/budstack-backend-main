import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import {
  SignInDto,
  UpdateUserFromAdminDto,
  VerifyEmailDto,
  WalletDto,
} from "./auth.dto";
import { MESSAGES, CONSTANT } from "src/constants";
import * as ethUtil from "ethereumjs-util";
import { ConfigService } from "@nestjs/config";
import { configData } from "src/config";
import { EmailService } from "src/email/email.service";
import { UtilsService } from "src/utils/utils.service";
import { TOKEN_TYPE } from "src/utils/utils.dto";
import { UserRepository } from "src/user/user.repository";
import { PermissionType, Prisma, Role, User } from "@prisma/client";
import { LOGIN_TYPE } from "src/constants/enums";
import {
  dappSignInMessage,
  signInWithNonceMessage,
} from "src/constants/constant";

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly utilsService: UtilsService,
    private readonly userRepository: UserRepository
  ) {}

  private readonly logger = new Logger();
  config: any = configData(this.configService);

  async generateNonce(body: WalletDto, loginType: LOGIN_TYPE) {
    try {
      let where: Prisma.UserWhereUniqueInput;
      if (body.email) {
        where = { email: body.email };
      } else if (body.walletAddress) {
        where = { walletAddress: body.walletAddress };
      }
      const nonce = Math.floor(Math.random() * 1000000);
      const { walletAddress } = body;
      const lowercaseWalletAddress = walletAddress.toLowerCase();
      await this.authRepository.upsertUser({
        where,
        data: {
          walletAddress: lowercaseWalletAddress,
          nonce,
        },
      });
      return {
        message: signInWithNonceMessage(loginType, walletAddress, nonce),
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Handles user authentication by verifying the provided wallet address and signature.
   * @param body An instance of SignInDto containing walletAddress and signature.
   * @param type An optional LOGIN_TYPE enum value, defaulting to LOGIN_TYPE.MARKETPLACE.
   * @returns An object containing a token if authentication is successful.
   * @throws Exceptions for various error conditions such as user not found, deactivated user, unauthorized access, etc.
   */
  async signIn(body: SignInDto, type: LOGIN_TYPE = LOGIN_TYPE.MARKETPLACE) {
    try {
      const user = await this.authRepository.getUser({
        where: { walletAddress: body.walletAddress.toLowerCase() },
        include: {
          nft: true,
        },
      });

      if (!user) {
        throw new NotFoundException(MESSAGES.ERROR.USERS.NOT_FOUND);
      }

      if (
        (type === LOGIN_TYPE.DAPP || type === LOGIN_TYPE.ADMIN) &&
        !user.isActive
      ) {
        throw new BadRequestException(MESSAGES.ERROR.USERS.DEACTIVATED);
      }

      let userAssociatedNFTs: number[];
      if (type === LOGIN_TYPE.DAPP) {
        userAssociatedNFTs = await this.checkDappPermissions(user);
      }

      if (type === LOGIN_TYPE.ADMIN) {
        await this.checkAdminPermissions(user);
      }
      
      this.verifyLoginSignature(
        type,
        body.walletAddress,
        user,
        userAssociatedNFTs,
        body.signature
      );

      if (user.enable2fa) {
        const message =
          await this.utilsService.sendEmailForTwoStepVerification(user);
        return {
          message,
        };
      }

      //if 2fa is not enable send token
      const payload = {
        id: user.id,
        tokenType: TOKEN_TYPE.LOGIN,
      };
      // Creates a token for the payload
      const token = await this.utilsService.createToken(payload);

      return {
        token,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private async checkDappPermissions(user: any) {
    const userAssociatedNFTs = await this.authRepository.getUserAssociatedNFTs(
      user.id
    );
    if (
      user.role == Role.ADMIN ||
      (user.role == Role.USER && !user.nft.length) ||
      ((user.role == Role.SUBADMIN || user.role == Role.MANAGER) &&
        userAssociatedNFTs.length === 0)
    ) {
      throw new NotFoundException(MESSAGES.ERROR.USERS.NOT_QUALIFIED_FOR_DAPP);
    }
    return userAssociatedNFTs;
  }

  private async checkAdminPermissions(user: User) {
    if (user.role === Role.ADMIN) return;
    if (user.role === Role.SUBADMIN) {
      const userPermissions = await this.userRepository.getUserPermissions({
        userId: user.id,
        permission: { notIn: [PermissionType.DApp] },
      });
      if (userPermissions.length > 0) return;
    }
    throw new UnauthorizedException(MESSAGES.ERROR.UNAUTHORIZED_ACTION);
  }

  private verifyLoginSignature(
    type: LOGIN_TYPE,
    walletAddress: string,
    user: any,
    userAssociatedNFTs: number[],
    signature: string
  ) {
    try {
      const msg = signInWithNonceMessage(type, walletAddress, user.nonce);
      this.loginSignatureVerification(msg, user.walletAddress, signature);

      if (
        type === LOGIN_TYPE.DAPP &&
        (user.role === Role.SUBADMIN || user.role === Role.MANAGER)
      ) {
        const dappMsg = dappSignInMessage(
          user.signerWalletAddress,
          walletAddress,
          userAssociatedNFTs
        );
        this.loginSignatureVerification(
          dappMsg,
          user.signerWalletAddress,
          user.signature
        );
      }
    } catch (error) {
      throw error;
    }
  }

  private loginSignatureVerification(
    message: string,
    signerWalletAddress: string,
    signature: string
  ) {
    try {
      // Convert msg to hex string
      const msgHex = ethUtil.bufferToHex(Buffer.from(message));
      const msgBuffer = ethUtil.toBuffer(msgHex);
      const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
      const signatureParams = ethUtil.fromRpcSig(signature);
      // Check if signature is valid
      const publicKey = ethUtil.ecrecover(
        msgHash,
        signatureParams.v,
        signatureParams.r,
        signatureParams.s
      );
      const addresBuffer = ethUtil.publicToAddress(publicKey);
      const address = ethUtil.bufferToHex(addresBuffer);
      if (address.toLowerCase() !== signerWalletAddress.toLowerCase()) {
        throw new UnauthorizedException(MESSAGES.ERROR.USERS.UNAUTHORIZED);
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async resendEmail(user, query) {
    try {
      const { id } = user;
      const { type } = query;
      try {
        user = await this.authRepository.getUser({
          where: {
            id,
          },
        });

        if (!user) {
          throw new UnauthorizedException(MESSAGES.ERROR.USERS.NOT_FOUND);
        }

        // Creates a token for the payload
        const payload: any = {
          id: user.id,
        };

        const sendEmailParams: any = {
          data: {},
          to_user: user,
        };

        if (type === TOKEN_TYPE.EMAIL_VERIFICATION) {
          // Returns if email is already verified.
          if (user.isVerified) {
            return MESSAGES.ERROR.EMAIL_VERIFIED;
          }
          payload.tokenType = TOKEN_TYPE.EMAIL_VERIFICATION;
          sendEmailParams.data.path = "/verify-email";
          sendEmailParams.subject = CONSTANT.EMAIL_SUBJECT.VERIFICATION_INVITE;
          sendEmailParams.mail_type = CONSTANT.MAIL_TYPE.VERIFICATION_INVITE;
        } else {
          payload.tokenType = TOKEN_TYPE.TWO_STEP_VERIFICATION;
          sendEmailParams.data.path = "/two-step-verification";
          sendEmailParams.subject =
            CONSTANT.EMAIL_SUBJECT.TWO_STEP_VERIFICATION;
          sendEmailParams.mail_type = CONSTANT.MAIL_TYPE.TWO_STEP_VERIFICATION;
        }

        const token = await this.utilsService.createToken(payload);
        sendEmailParams.data.payload = token;

        // Send email-invite to the user
        await this.emailService.sendEmail({ ...sendEmailParams });
      } catch (error) {
        throw new BadRequestException(MESSAGES.ERROR.SEND_EMAIL);
      }
      return `${MESSAGES.SUCCESS.SEND_EMAIL} ${user.email}`;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async verifyEmail(query: VerifyEmailDto) {
    try {
      const decryptedToken: any = await this.utilsService.decodeToken(query);

      if (!decryptedToken.id || !decryptedToken.tokenType) {
        throw new ConflictException(MESSAGES.ERROR.INVALID_TOKEN);
      }
      if (query.type === TOKEN_TYPE.EMAIL_VERIFICATION) {
        await this.authRepository.updateUser({
          where: { id: decryptedToken.id },
          data: {
            isVerified: true,
          },
        });

        return MESSAGES.SUCCESS.VERIFIED_EMAIL;
      } else {
        const payload = {
          id: decryptedToken.id,
          tokenType: TOKEN_TYPE.LOGIN,
        };
        // Creates a token for the payload
        const token = await this.utilsService.createToken(payload);
        return {
          token,
        };
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async disable2FA(query: UpdateUserFromAdminDto) {
    try {
      const updatedUser = await this.userRepository.updateUser({
        where: {
          id: query.id,
        },
        data: {
          enable2fa: false,
        },
      });

      return `${MESSAGES.SUCCESS.ADMIN.DISABLE_2FA} ${updatedUser.email ?? "user"}`;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
