import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { AuthRepository } from "src/auth/auth.repository";
import { EmailService } from "src/email/email.service";
import { CONSTANT, MESSAGES } from "src/constants";
import { UtilsService } from "src/utils/utils.service";
import {
  CreateUserDto,
  CreateWhitelistUsersDto,
  PermissionDto,
  QueryParamsDto,
  RemoveWhitelistedUserDto,
  UpdatePrimaryNftDto,
  UpdateUserDto,
  UpdateUserStatusDto,
  UserType,
  getAllUsersDto,
} from "./user.dto";
import { TOKEN_TYPE } from "src/utils/utils.dto";
import {
  AdminApprovalOnClient,
  AdminApprovalOnOrder,
  NftType,
  OrderActivity,
  OrderStatus,
  PaymentStatus,
  PermissionType,
  Prisma,
  Role,
  User,
} from "@prisma/client";
import { GetAllNftsQueryDto, GetUsersQueryDto } from "src/nft/nft.dto";
import { RoleByType } from "src/constants/constant";
import { OrderRepository } from "src/order/order.repository";
import { CommissionRepository } from "src/commission/commission.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
    private readonly orderRepository: OrderRepository,
    private readonly commissionRepository: CommissionRepository,
    private readonly emailService: EmailService,
    private readonly utilsService: UtilsService
  ) {}
  private readonly logger = new Logger();

  async getSummaryByUserType(req, userType: UserType) {
    try {
      if (userType == UserType.NFTHOLDER) {
        return await this.userRepository.getSummary({
          where: { role: Role.USER, nft: { some: {} } },
        });
      } else if (userType == UserType.WHITELISTED) {
        return await this.userRepository.getWhitelistedSummary();
      } else {
        return await this.userRepository.getSummary({
          where: { role: RoleByType[userType] },
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async getSummaryByUserId(req, userId: string) {
    try {
      const user = await this.userRepository.getUserDetails({ id: userId });
      if (!user) {
        throw new NotFoundException(MESSAGES.ERROR.USERS.NOT_FOUND);
      }
      const { totalNfts, totalClients, totalOrders } =
        await this.userRepository.getUserSummary({
          nftWhereClouse: { owner: { id: userId } },
          clientWhereClouse: {
            nft: { owner: { id: userId } },
            adminApproval: AdminApprovalOnClient.VERIFIED,
          },
          orderWhereClouse: {
            nft: { owner: { id: userId } },
            adminApproval: AdminApprovalOnOrder.VERIFIED,
            paymentStatus: PaymentStatus.PAID,
          },
        });
      return {
        summary: {
          totalNfts,
          totalClients,
          totalOrders,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async addUser(req, body: CreateUserDto) {
    try {
      const { id, role } = req.user;
      const userAddress = await this.userRepository.getUserDetails({
        walletAddress: body.walletAddress,
      });
      if (userAddress) {
        throw new NotFoundException(
          MESSAGES.ERROR.USERS.WALLET_ADDRESS_ALREADY_EXISTS
        );
      }
      const userEmail = await this.userRepository.getUserDetails({
        email: body.email,
      });
      if (userEmail) {
        throw new NotFoundException(
          MESSAGES.ERROR.USERS.EMAIL_ID_ALREADY_EXISTS
        );
      }
      let userData = this.prepareUserData(body);

      if (await this.isAuthorizedToAddUser(role, id, body.userRole)) {
        if (body.userRole === Role.SUBADMIN) {
          userData = {
            ...userData,
            ...(await this.prepareSubAdminPermissions(
              id,
              role,
              body.permissions
            )),
          };
        } else if (body.userRole === Role.MANAGER) {
          userData.commissionPercent = body.commissionPercent;
          userData = {
            ...userData,
            ...(await this.calculateManagerCommissions(
              body.nftIds,
              body.commissionPercent
            )),
            ...this.defaultManagerPermission(),
          };
        } else {
          throw new BadRequestException(
            MESSAGES.ERROR.USERS.INVALID_USER_TO_ADD
          );
        }
        const user = await this.userRepository.createUser(userData);
        await this.sendWelcomeEmail(user, body.walletAddress, body.userRole);
        return MESSAGES.SUCCESS.DEFAULT;
      } else {
        throw new UnauthorizedException(
          MESSAGES.ERROR.USERS.NOT_AUTHORIZED_TO_ADD_USER
        );
      }
    } catch (error) {
      throw error;
    }
  }

  private prepareUserData(body: CreateUserDto): Prisma.UserCreateInput {
    return {
      fullName: body.fullName,
      email: body.email,
      phoneCountryCode: body.phoneCountryCode,
      phoneCode: body.phoneCode,
      phoneNumber: body.phoneNumber,
      walletAddress: body.walletAddress,
      signerWalletAddress: body.signerWalletAddress,
      signature: body.signature,
      isActive: true,
      role: body.userRole,
      UserNftRoleAssociation: {
        createMany: {
          data: body.nftIds.map((tokenId) => ({ tokenId })),
          skipDuplicates: true,
        },
      },
    };
  }

  private async isAuthorizedToAddUser(
    role: Role,
    userId: string,
    userRole: Role
  ): Promise<boolean> {
    if (role === Role.ADMIN) {
      return true;
    }

    if (role === Role.SUBADMIN && userRole === Role.SUBADMIN) {
      return await this.userRepository.getUserPermission({
        userId,
        permission: PermissionType.SubAdminManagement,
      });
    }

    if (role === Role.SUBADMIN && userRole === Role.MANAGER) {
      return await this.userRepository.getUserPermission({
        userId,
        permission: PermissionType.CelebrityAgent,
      });
    }

    if (role === Role.SUBADMIN && userRole === Role.USER) {
      return await this.userRepository.getUserPermission({
        userId,
        permission: PermissionType.UserManagement,
      });
    }

    return false;
  }

  private async prepareSubAdminPermissions(
    userId: string,
    role: Role,
    permissions: PermissionDto[]
  ): Promise<Prisma.UserCreateInput> {
    if (role === Role.ADMIN) {
      return {
        userPermission: {
          createMany: {
            data: permissions.map((permission) => ({
              permission: permission.permission,
              read: permission.read,
              write: permission.write,
            })),
            skipDuplicates: false,
          },
        },
      };
    } else {
      const userPermissions = await this.userRepository.getUserPermissions({
        userId,
      });
      const validPermissions = permissions.filter((permission) =>
        userPermissions.some(
          (existing) => existing.permission === permission.permission
        )
      );
      return {
        userPermission: {
          createMany: {
            data: validPermissions.map((permission) => ({
              permission: permission.permission,
              read: permission.read,
              write: permission.write,
            })),
            skipDuplicates: false,
          },
        },
      };
    }
  }

  private async calculateManagerCommissions(
    nftIds: number[],
    commissionPercent: number
  ): Promise<Prisma.UserCreateInput> {
    const orders = (
      await Promise.all(
        nftIds.map((tokenId) =>
          this.userRepository.getAllOrdersForCommission(tokenId)
        )
      )
    ).reduce((acc, curr) => acc.concat(curr || []), []);

    const ordersCommission = await Promise.all(
      orders.map(async (order) => {
        const amountInDollar = (order.agentProfit * commissionPercent) / 100;

        // Update the holder's commission for this order
        await this.updateHolderCommission(
          order.id,
          order.nft.ownerId,
          order.agentProfit,
          amountInDollar,
          0
        );

        return {
          orderId: order.id,
          amountInDollar,
          paymentStatus: PaymentStatus.PENDING, // Replace with your actual enum or constant
        };
      })
    );
    return {
      commission: {
        createMany: {
          data: ordersCommission,
          skipDuplicates: true,
        },
      },
    };
  }

  async updateHolderCommission(
    orderId: string,
    ownerId: string,
    totalProfit: number,
    deductAmount: number,
    incrementAmount: number
  ) {
    try {
      await this.userRepository.updateHolderCommission(
        orderId,
        ownerId,
        totalProfit,
        deductAmount,
        incrementAmount
      );
    } catch (error) {
      throw error;
    }
  }

  private defaultManagerPermission(): Prisma.UserCreateInput {
    return {
      userPermission: {
        create: {
          permission: PermissionType.DApp,
          read: true,
        },
      },
    };
  }

  private async sendWelcomeEmail(
    user: User,
    walletAddress: string,
    userType: Role
  ): Promise<void> {
    await this.emailService.sendEmail({
      data: { path: "/", payload: walletAddress },
      subject:
        userType == Role.SUBADMIN
          ? CONSTANT.EMAIL_SUBJECT.SUB_ADMIN_ABOARD
          : CONSTANT.EMAIL_SUBJECT.MANAGER_ABOARD,
      mail_type: CONSTANT.MAIL_TYPE.SUBADMIN_OR_MANAGER_ABOARD,
      to_user: user,
      userType,
    });
  }

  async whitelistUsers(req, body: CreateWhitelistUsersDto) {
    try {
      const { id, role } = req.user;
      const { walletAddress, nftLimits } = body;
      if (
        role == Role.SUBADMIN &&
        !(await this.userRepository.getUserPermission({
          userId: id,
          permission: { in: [PermissionType.UserManagement] },
          isWhitelister: true
        }))
      ) {
        throw new UnauthorizedException(MESSAGES.ERROR.ACCESS_DENIED);
      }
      const user = await this.userRepository.getWhitelistedUser(walletAddress);
      if (user) {
        throw new BadRequestException(
          MESSAGES.ERROR.USERS.USER_ALREADY_WHITELISTED
        );
      }
      const mintedNFTs = await this.userRepository.getTotalMintedNFTs();
      const data: Prisma.WhitelistedUsersCreateInput = {
        walletAddress,
      };
      nftLimits.forEach(async (nft) => {
        if (nft.nftType === NftType.Gold) {
          if (
            mintedNFTs.totalGoldMinted + nft.nftLimit >
            CONSTANT.GOLD_MINT_LIMIT
          )
            throw new BadRequestException(
              MESSAGES.ERROR.USERS.EXCEED_GOLD_LIMIT
            );
          data.goldLimit = nft.nftLimit;
          data.goldSignature = nft.signature;
        }
        if (nft.nftType === NftType.Platinum) {
          if (
            mintedNFTs.totalPlatinumMinted + nft.nftLimit >
            CONSTANT.PLATINUM_MINT_LIMIT
          )
            throw new BadRequestException(
              MESSAGES.ERROR.USERS.EXCEED_PLATINUM_LIMIT
            );
          data.platinumLimit = nft.nftLimit;
          data.platinumSignature = nft.signature;
        }
        if (nft.nftType === NftType.Standard) {
          if (
            mintedNFTs.totalStandardMinted + nft.nftLimit >
            CONSTANT.STANDARD_MINT_LIMIT
          )
            throw new BadRequestException(
              MESSAGES.ERROR.USERS.EXCEED_STANDARD_LIMIT
            );
          data.standardLimit = nft.nftLimit;
          data.standardSignature = nft.signature;
        }
      });
      await this.userRepository.createWhitelistedUser(data);
      return MESSAGES.SUCCESS.DEFAULT;
    } catch (error) {
      throw error;
    }
  }

  async removeWhitelistedUser(req, body: RemoveWhitelistedUserDto) {
    try {
      const { walletAddress, nftTypes } = body;
      const whitelistedUser =
        await this.userRepository.getWhitelistedUser(walletAddress);

      if (!whitelistedUser) {
        throw new NotFoundException(MESSAGES.ERROR.USERS.NOT_FOUND);
      }

      const updateData: Prisma.WhitelistedUsersUpdateInput = {};

      if (nftTypes.includes(NftType.Gold)) {
        updateData.goldLimit = whitelistedUser.goldMinted;
        updateData.goldSignature = null;
      }
      if (nftTypes.includes(NftType.Platinum)) {
        updateData.platinumLimit = whitelistedUser.platinumMinted;
        updateData.platinumSignature = null;
      }
      if (nftTypes.includes(NftType.Standard)) {
        updateData.standardLimit = whitelistedUser.standardMinted;
        updateData.standardSignature = null;
      }

      // Determine the final limits after the update
      const goldLimitAfterUpdate = nftTypes.includes(NftType.Gold)
        ? 0
        : whitelistedUser.goldLimit;
      const platinumLimitAfterUpdate = nftTypes.includes(NftType.Platinum)
        ? 0
        : whitelistedUser.platinumLimit;
      const standardLimitAfterUpdate = nftTypes.includes(NftType.Standard)
        ? 0
        : whitelistedUser.standardLimit;

      // Check if all limits and minted amounts are zero
      const allNftLimitsZero =
        goldLimitAfterUpdate === 0 &&
        platinumLimitAfterUpdate === 0 &&
        standardLimitAfterUpdate === 0;
      const allMintedZero =
        whitelistedUser.goldMinted === 0 &&
        whitelistedUser.platinumMinted === 0 &&
        whitelistedUser.standardMinted === 0;

      if (allNftLimitsZero && allMintedZero) {
        await this.userRepository.removeWhitelistedUser(walletAddress);
      } else {
        await this.userRepository.updateWhitelistedUser(
          walletAddress,
          updateData
        );
      }
      return MESSAGES.SUCCESS.DEFAULT;
    } catch (error) {
      throw error;
    }
  }

  async validateToken(req, token: string, address: string) {
    try {
      let data;
      if (token) {
        const tokens = token.split(" ");
        data = await this.utilsService.decodeToken({
          token: tokens[1],
          type: TOKEN_TYPE.LOGIN,
        });
      }
      const user = await this.authRepository.getUser({
        where: { id: data.id },
        select: {
          id: true,
          walletAddress: true,
          email: true,
          role: true,
        },
      });
      if (!user) {
        return false;
      }
      if (address.toLowerCase() != user.walletAddress.toLowerCase()) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateUser(req, userId: string, body: UpdateUserDto) {
    try {
      const { id, role } = req.user;
      const { userRole, isActive } = body;
      const user = await this.userRepository.getUserDetails({ id: userId });
      if (!user) {
        throw new NotFoundException(MESSAGES.ERROR.USERS.NOT_FOUND);
      } else if (id === userId) {
        throw new UnauthorizedException(
          MESSAGES.ERROR.USERS.NOT_AUTHORIZED_TO_UPDATE_OWN_DETAILS
        );
      }
      let updateData: Prisma.UserUpdateInput = {};
      if (await this.isAuthorizedToAddUser(role, id, user.role)) {
        if (userRole === Role.SUBADMIN || userRole === Role.MANAGER) {
          updateData = await this.prepareUpdateData(
            id,
            role,
            body,
            userId,
            user.UserNftRoleAssociation
          );
        }
        if (isActive !== undefined) updateData.isActive = isActive;
        await this.userRepository.updateUser({
          where: {
            id: userId,
          },
          data: updateData,
        });
        return MESSAGES.SUCCESS.DEFAULT;
      } else {
        throw new UnauthorizedException(
          MESSAGES.ERROR.USERS.NOT_AUTHORIZED_TO_UPDATE_USER
        );
      }
    } catch (error) {
      throw error;
    }
  }

  private async prepareUpdateData(
    id: string,
    role: Role,
    body: UpdateUserDto,
    userId: string,
    tokens: any
  ): Promise<Prisma.UserUpdateInput> {
    const {
      fullName,
      email,
      phoneCountryCode,
      phoneCode,
      phoneNumber,
      userRole,
      nftIds,
      signerWalletAddress,
      commissionPercent,
      permissions,
      signature,
    } = body;

    const updateData: Prisma.UserUpdateInput = {};

    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email;
    if (phoneNumber) {
      updateData.phoneCountryCode = phoneCountryCode;
      updateData.phoneCode = phoneCode;
      updateData.phoneNumber = phoneNumber;
    }

    if (nftIds) {
      updateData.UserNftRoleAssociation = {
        deleteMany: { userId },
        createMany: {
          data: nftIds.map((tokenId) => ({ tokenId })),
          skipDuplicates: true,
        },
      };
      updateData.signerWalletAddress = signerWalletAddress;
      updateData.signature = signature;
    }

    if (permissions && userRole === Role.SUBADMIN) {
      if (role === Role.ADMIN) {
        updateData.userPermission = {
          deleteMany: { userId },
          createMany: {
            data: permissions.map((permission) => ({
              permission: permission.permission,
              read: permission.read,
              write: permission.write,
            })),
            skipDuplicates: true,
          },
        };
      } else {
        const userPermissions = await this.userRepository.getUserPermissions({
          userId: id,
        });
        const validPermissions = permissions.filter((permission) =>
          userPermissions.some(
            (existing) => existing.permission === permission.permission
          )
        );
        updateData.userPermission = {
          deleteMany: { userId },
          createMany: {
            data: validPermissions.map((permission) => ({
              permission: permission.permission,
              read: permission.read,
              write: permission.write,
            })),
            skipDuplicates: true,
          },
        };
      }
    }

    if (userRole === Role.MANAGER && commissionPercent !== undefined) {
      updateData.commissionPercent = commissionPercent;
      const manager = await this.userRepository.getUserDetails({ id: userId });
      const orders = (
        await Promise.all(
          nftIds.map((tokenId) =>
            this.userRepository.getAllOrdersForCommission(tokenId)
          )
        )
      ).reduce((acc, curr) => acc.concat(curr || []), []);

      const commisisonToDelete: {
        userId: string;
        paymentStatus: PaymentStatus;
      }[] = [];
      const commisisonToAdd: Prisma.CommissionsCreateManyUserInput[] = [];

      await Promise.all(
        orders.map(async (order) => {
          const amountInDollar = (order.agentProfit * commissionPercent) / 100;
          let deductAmount: number;
          let incrementAmount: number;
          const isExist = await this.commissionRepository.isCommissionExist({
            where: {
              userId,
              paymentStatus: PaymentStatus.PENDING,
              orderId: order.id,
            },
          });
          if (isExist) {
            if (commissionPercent < manager.commissionPercent) {
              // Add the difference to the holder's commission
              incrementAmount =
                (order.agentProfit *
                  (manager.commissionPercent - commissionPercent)) /
                100;
              deductAmount = null; // No deduction in this case
            } else {
              // Deduct the difference from the holder's commission
              deductAmount =
                (order.agentProfit *
                  (commissionPercent - manager.commissionPercent)) /
                100;
              incrementAmount = null; // No increment in this case
            }
          } else {
            deductAmount = (order.agentProfit * commissionPercent) / 100;
          }

          // Update the holder's commission for this order
          await this.updateHolderCommission(
            order.id,
            order.nft.ownerId,
            order.agentProfit,
            deductAmount,
            incrementAmount
          );

          // Push commission to add to the array
          commisisonToDelete.push({
            userId,
            paymentStatus: PaymentStatus.PENDING,
          });

          // Push commission to add to the array
          commisisonToAdd.push({
            orderId: order.id,
            amountInDollar,
            paymentStatus: PaymentStatus.PENDING,
          });
        })
      );
      // Fetch irrelevant commissions before deletion
      const { commissions } = await this.commissionRepository.getAllCommissions(
        {
          where: {
            userId,
            paymentStatus: PaymentStatus.PENDING,
            orderId: { notIn: orders.map((order) => order.id) },
          },
        }
      );

      // Add removed commission amounts to the relevant NFT holder's commission amount
      await Promise.all(
        commissions.map(async (commission) => {
          const order = await this.orderRepository.getOrder({
            where: { id: commission.orderId },
            select: {
              id: true,
              agentProfit: true,
              nft: { select: { ownerId: true } },
            },
          });
          const nftOwnerId = order.nft.ownerId;
          const incrementAmount = commission.amountInDollar;

          await this.updateHolderCommission(
            order.id,
            nftOwnerId,
            order.agentProfit,
            0,
            incrementAmount
          );
        })
      );

      updateData.commission = {
        deleteMany: commisisonToDelete,
        createMany: { data: commisisonToAdd, skipDuplicates: true },
      };
    }

    return updateData;
  }

  async updateProfileById(body, user) {
    try {
      const { id } = user;

      //If email is updated change to unverified
      if (body.email && user.email !== body.email) {
        body.isVerified = false;
      }
      const updatedUser = await this.userRepository.updateUser({
        where: {
          id,
        },
        data: {
          ...body,
        },
      });

      const response: any = {
        data: updatedUser,
      };

      const payload = {
        id: user.id,
        tokenType: TOKEN_TYPE.EMAIL_VERIFICATION,
      };
      // Creates a token for the payload
      if (
        (body.email && user.email !== body.email) ||
        (user.email && !updatedUser.isVerified)
      ) {
        const token = await this.utilsService.createToken(payload);
        await this.emailService.sendEmail({
          data: { path: "/verify-email", payload: token },
          subject: CONSTANT.EMAIL_SUBJECT.VERIFICATION_INVITE,
          mail_type: CONSTANT.MAIL_TYPE.VERIFICATION_INVITE,
          to_user: updatedUser,
          userType: undefined,
        });
        response.message = `${MESSAGES.SUCCESS.SEND_EMAIL} ${updatedUser.email}`;
      }
      return await this.getMe(user);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async sendEmail() {
    await this.emailService.sendEmail({
      data: { path: "/verify-email", payload: "token" },
      subject: CONSTANT.EMAIL_SUBJECT.VERIFICATION_INVITE,
      mail_type: CONSTANT.MAIL_TYPE.VERIFICATION_INVITE,
      to_user: { email: "dheerajkumar1437175@gmail.com" },
      userType: undefined,
    });
  }

  async getMe(user) {
    try {
      const { id } = user;
      const me = await this.authRepository.getUser({
        where: {
          id,
        },
        select: {
          walletAddress: true,
          email: true,
          fullName: true,
          username: true,
          id: true,
          role: true,
          isVerified: true,
          profileUrl: true,
          bio: true,
          notification: true,
          primaryNftId: true,
          userPermission: {
            where: { userId: id, permission: { notIn: [PermissionType.DApp] } },
            select: {
              id: true,
              permission: true,
              read: true,
              write: true,
              isWhitelister: true,
            },
          },
          PrimaryNft: {
            select: {
              owner: {
                select: {
                  fullName: true,
                  username: true,
                  walletAddress: true,
                  profileUrl: true,
                },
              },
              nftMetadata: {
                select: {
                  nftName: true,
                  imageUrl: true,
                  tokenId: true,
                },
              },
            },
          },
        },
      });
      delete me.nonce;
      return me;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async checkUserName(param, user) {
    try {
      const { username } = param;
      const isUsernameExist = await this.userRepository.isUserExist({
        where: {
          username,
        },
      });
      return {
        isExist: !!isUsernameExist,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async checkUserEmail(param, user) {
    try {
      const { email } = param;
      const isUserEmailExist = await this.userRepository.isUserExist({
        where: {
          email,
        },
      });
      return {
        isExist: !!isUserEmailExist,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllUsers(query: getAllUsersDto) {
    try {
      const {
        skip,
        take,
        page,
        orderBy,
        byStatus,
        search,
        userType,
        agentStatus,
        tokenId,
      } = query;
      const { users, count } = await this.userRepository.getAllUsers(
        RoleByType[userType],
        tokenId,
        agentStatus,
        userType === UserType.WHITELISTED ? true : false,
        byStatus,
        search,
        skip,
        take,
        orderBy
      );

      return {
        users,
        paginationCount: count,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getUserDetails(userId: string) {
    try {
      return await this.userRepository.getUserDetails({ id: userId });
    } catch (error) {
      throw error;
    }
  }

  async getUserAssociatedNFTsWithDetails(req, userId: string) {
    try {
      const { associatedNfts, count } =
        await this.userRepository.getUserAssociatedNFTsWithDetails(userId);
      return { associatedNfts, paginationCount: count };
    } catch (error) {
      throw error;
    }
  }

  async getAllCelebrities(req, query: QueryParamsDto) {
    try {
      const { walletAddress, role } = req.user;
      const { search, orderBy, page, take, skip } = query;
      const where: Prisma.UserNftRoleAssociationWhereInput = {
        user: {
          walletAddress,
        },
        nft: {
          nftMetadata: {
            nftType: { in: [NftType.Gold, NftType.Platinum] },
          },
        },
      };
      if (search) {
        where.user = {
          OR: [
            { fullName: { contains: search, mode: "insensitive" } },
            { username: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        };
      }
      const { data, count } =
        await this.userRepository.getAllCelebritiesOrAssociatedNFTs({
          where,
          select: {
            nft: {
              select: {
                owner: {
                  select: {
                    id: true,
                    walletAddress: true,
                    fullName: true,
                    email: true,
                    phoneCountryCode: true,
                    phoneCode: true,
                    phoneNumber: true,
                    profileUrl: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: orderBy ? orderBy : Prisma.SortOrder.desc },
          take: take,
          skip: skip,
        });
      const celebrities = data.map((data) => {
        return data["nft"]?.owner;
      });
      return { celebrities, paginationCount: count };
    } catch (error) {
      throw error;
    }
  }

  async getAllNftsByCelebrityIds(req, query: GetAllNftsQueryDto) {
    try {
      const { search, celebrityIds } = query;
      const where: Prisma.NftWhereInput = {
        owner: { id: { in: celebrityIds } },
        nftMetadata: {
          nftType: { in: [NftType.Gold, NftType.Platinum] },
        },
      };
      if (search) {
        where.nftMetadata = {
          OR: [{ nftName: { contains: search, mode: "insensitive" } }],
        };
      }
      const nfts = await this.userRepository.getAllNftsByCelebrityIds({
        where,
        select: { id: true, tokenId: true },
      });
      return nfts;
    } catch (error) {
      throw error;
    }
  }

  async getCelebritiesNFTsAssociatedWithAgent(req, query: QueryParamsDto) {
    try {
      const { walletAddress, role } = req.user;
      const { search, orderBy, page, take, skip } = query;
      const where: Prisma.UserNftRoleAssociationWhereInput = {
        user: { walletAddress, role },
      };
      if (search) {
        where.nft = {
          OR: [
            {
              nftMetadata: {
                nftName: { contains: search, mode: "insensitive" },
              },
            },
          ],
        };
      }
      const { data, count } =
        await this.userRepository.getAllCelebritiesOrAssociatedNFTs({
          where,
          select: {
            nft: {
              select: {
                tokenId: true,
                nftMetadata: {
                  select: { nftName: true, nftType: true, imageUrl: true },
                },
                owner: {
                  select: {
                    id: true,
                    walletAddress: true,
                    fullName: true,
                    username: true,
                    email: true,
                    phoneCountryCode: true,
                    phoneCode: true,
                    phoneNumber: true,
                    profileUrl: true,
                    isActive: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: orderBy ? orderBy : Prisma.SortOrder.desc },
          take: take,
          skip: skip,
        });
      const response = {
        nft: data.map((item) => ({
          tokenId: item["nft"]?.tokenId,
          nftMetadata: {
            nftName: item["nft"]?.nftMetadata?.nftName,
            nftType: item["nft"]?.nftMetadata?.nftType,
            imageUrl: item["nft"]?.nftMetadata?.imageUrl,
          },
          owner: item["nft"]?.owner,
        })),
      };
      return { nfts: response.nft, paginationCount: count };
    } catch (error) {
      throw error;
    }
  }

  async getUserMintedNFTsById(req, userId: string, query: QueryParamsDto) {
    try {
      const user = await this.userRepository.getUserDetails({ id: userId });
      if (!user) throw new NotFoundException(MESSAGES.ERROR.USERS.NOT_FOUND);
      return await this.getUserMintedNFTs(
        {
          user: { walletAddress: user.walletAddress, role: user.role },
        },
        query
      );
    } catch (error) {
      throw error;
    }
  }

  async getUserMintedNFTsList(req, userId: string) {
    try {
      const user = await this.userRepository.getUserDetails({ id: userId });
      if (!user) throw new NotFoundException(MESSAGES.ERROR.USERS.NOT_FOUND);
      const { nfts, count } = await this.userRepository.getUserMintedNFTs({
        where: { ownerId: user.walletAddress },
        select: { tokenId: true },
        orderBy: { tokenId: Prisma.SortOrder.asc },
      });
      return { nfts };
    } catch (error) {
      throw error;
    }
  }

  async getUserMintedNFTs(req, query: QueryParamsDto) {
    try {
      const { walletAddress, role } = req.user;
      const { search, orderBy, page, take, skip } = query;
      const where: Prisma.NftWhereInput = {
        ownerId: walletAddress,
      };
      if (search) {
        where.nftMetadata = {
          nftName: { contains: search, mode: "insensitive" },
        };
      }
      const { nfts, count } = await this.userRepository.getUserMintedNFTs({
        where,
        select: {
          tokenId: true,
          nftMetadata: {
            select: { nftName: true, nftType: true, imageUrl: true },
          },
          owner: {
            select: {
              id: true,
              walletAddress: true,
              fullName: true,
              username: true,
              email: true,
              phoneCountryCode: true,
              phoneCode: true,
              phoneNumber: true,
              profileUrl: true,
              isActive: true,
            },
          },
        },
        take: take,
        skip: skip,
        orderBy: { createdAt: orderBy || Prisma.SortOrder.desc },
      });
      return { nfts, paginationCount: count };
    } catch (error) {
      throw error;
    }
  }

  async updateUserPrimaryNFT(req, query: UpdatePrimaryNftDto) {
    try {
      const { id, walletAddress, role } = req.user;
      const { tokenId } = query;
      if (role === Role.USER) {
        const user = await this.authRepository.getUser({
          where: {
            walletAddress: walletAddress.toLowerCase(),
            nft: { some: { tokenId } },
          },
        });
        if (!user) {
          throw new BadRequestException(MESSAGES.ERROR.NFT.NOT_ASSOCIATED);
        }
        await this.authRepository.updateUser({
          where: {
            id: id,
          },
          data: {
            PrimaryNft: {
              connect: {
                tokenId,
              },
            },
          },
        });
        return MESSAGES.SUCCESS.DEFAULT;
      } else if (role === Role.MANAGER || role === Role.SUBADMIN) {
        const iSNftAssociated = await this.userRepository.iSNftAssociated(
          id,
          tokenId
        );
        if (!iSNftAssociated) {
          throw new BadRequestException(MESSAGES.ERROR.NFT.NOT_ASSOCIATED);
        }
        await this.authRepository.updateUser({
          where: {
            id: id,
          },
          data: {
            PrimaryNft: {
              connect: {
                tokenId,
              },
            },
          },
        });
        return MESSAGES.SUCCESS.DEFAULT;
      } else {
        throw new BadRequestException(
          MESSAGES.ERROR.USERS.NOT_QUALIFIED_FOR_DAPP
        );
      }
    } catch (error) {
      throw error;
    }
  }
  async getUserWalletProof(req) {
    try {
      const { walletAddress } = req.user;
      const response =
        await this.userRepository.getUserWalletProof(walletAddress);
      return {
        walletAddress,
        proof: response ? response.proof.split(",") : [],
      };
    } catch (error) {
      throw error;
    }
  }
}
