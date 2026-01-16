import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  EmailTypeDto,
  SignInDto,
  UpdateUserFromAdminDto,
  VerifyEmailDto,
  WalletDto,
} from "./auth.dto";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "@prisma/client";
import { RoleGuard } from "src/guard/roles.guard";
import { LOGIN_TYPE } from "src/constants/enums";

/**
 * The AuthController class provides endpoints for authentication-related operations, such as generating a nonce, signing in, resending email verification, and disabling 2FA for admin users.
 */
@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Generates a nonce for the provided wallet address and login type.
   * @param body - The data containing the wallet address and login type.
   * @returns A nonce generated for the provided wallet address.
   */
  @Post("nonce")
  @ApiResponse({
    status: 201,
    description: "Get Nonce",
  })
  async generateNonce(@Body() body: WalletDto): Promise<any> {
    const { type } = body;
    const loginType =
      type === "dapp"
        ? LOGIN_TYPE.DAPP
        : type === "admin"
          ? LOGIN_TYPE.ADMIN
          : LOGIN_TYPE.MARKETPLACE;
    return await this.authService.generateNonce(body, loginType);
  }

  /**
   * Signs in a user based on the provided wallet address and signature.
   * @param body - The data containing the wallet address and signature.
   * @returns The response after signing in the user.
   */
  @Post("signIn")
  @ApiResponse({
    status: 201,
    description: "To SignIn",
  })
  async signIn(@Body() body: SignInDto): Promise<any> {
    return await this.authService.signIn(body);
  }

  /**
   * Signs in a user specifically for Dapp.
   * @param body - The data containing the wallet address and signature for Dapp.
   * @returns The response after signing in the user for Dapp.
   */
  @Post("dapp/signIn")
  @ApiResponse({
    status: 201,
    description: "To SignIn for Dapp",
  })
  async dappSignIn(@Body() body: SignInDto): Promise<any> {
    return await this.authService.signIn(body, LOGIN_TYPE.DAPP);
  }

  /**
   * Signs in a user specifically for Admin.
   * @param body - The data containing the wallet address and signature for Admin.
   * @returns The response after signing in the user for Admin.
   */
  @Post("admin/signIn")
  @ApiResponse({
    status: 201,
    description: "To SignIn for Admin",
  })
  async adminSignIn(@Body() body: SignInDto): Promise<any> {
    return await this.authService.signIn(body, LOGIN_TYPE.ADMIN);
  }

  /**
   * Resends email verification or two-step verification email.
   * @param query - The query parameters for email type.
   * @param req - The request object.
   * @returns The response after resending the email verification.
   */
  @UseGuards(AuthGuard("jwt"))
  @Get("resendEmail")
  @ApiResponse({
    status: 201,
    description: "To Resend Email",
  })
  async resendEmail(@Query() query: EmailTypeDto, @Req() req): Promise<any> {
    return await this.authService.resendEmail(req.user, query);
  }

  /**
   * Verifies email using the provided token.
   * @param query - The query parameters containing the verification token.
   * @returns The response after verifying the email.
   */
  @Get("verifyEmail")
  @ApiResponse({
    status: 201,
    description: "To Verify Email",
  })
  async verifyEmail(@Query() query: VerifyEmailDto): Promise<any> {
    return await this.authService.verifyEmail(query);
  }

  /**
   * Disables 2FA for the specified user.
   * @param query - The query parameters for updating user from admin.
   * @returns The response after disabling 2FA for the user.
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN]))
  @Post("admin/disable2fa")
  @ApiResponse({
    status: 201,
    description: "To Disable 2FA",
  })
  async disableUser2FA(@Query() query: UpdateUserFromAdminDto): Promise<any> {
    return await this.authService.disable2FA(query);
  }
}
