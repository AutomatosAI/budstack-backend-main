import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { stringify } from 'csv-stringify';
import {
  CreateUserDto,
  CreateWhitelistUsersDto,
  QueryParamsDto,
  RemoveWhitelistedUserDto,
  UpdatePrimaryNftDto,
  UpdateUserDto,
  UpdateUserStatusDto,
  UserParamsDto,
  UserType,
  checkUserEmailDto,
  checkUsernameDto,
  getAllUsersDto,
  updateProfileDto,
} from "./user.dto";
import { AuthGuard } from "@nestjs/passport";
import { RoleGuard } from "src/guard/index.guard";
import { Role } from "@prisma/client";
import { GetAllNftsQueryDto, GetUsersQueryDto } from "src/nft/nft.dto";
import { Response } from "express";
import { UtilsService } from "src/utils/utils.service";

@ApiTags("User")
@Controller("")
export class UserController {
  constructor(private readonly userService: UserService,private readonly utilsService:UtilsService) { }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("users/summary")
  @ApiResponse({
    status: 201,
    description: "To get summary of users by userType",
  })
  async getSummaryByUserType(
    @Req() req,
    @Query("userType") userType: UserType
  ) {
    return await this.userService.getSummaryByUserType(req, userType);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("users/:userId/summary")
  @ApiResponse({
    status: 201,
    description: "To get summary of user by userId",
  })
  async getSummaryByUserId(@Req() req, @Param() params: UserParamsDto) {
    return await this.userService.getSummaryByUserId(req, params.userId);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Post("users")
  @ApiResponse({ status: 201, description: "To add a new user" })
  async addUser(@Req() req, @Body() body: CreateUserDto) {
    return await this.userService.addUser(req, body);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Post("users/whitelist")
  @ApiResponse({ status: 201, description: "To whitelist a user" })
  async whitelistUser(@Req() req, @Body() body: CreateWhitelistUsersDto) {
    return await this.userService.whitelistUsers(req, body);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Patch("users/whitelist/remove")
  @ApiResponse({ status: 201, description: "To remove whitelisted user" })
  async removeWhitelistedUser(
    @Req() req,
    @Body() body: RemoveWhitelistedUserDto
  ) {
    return await this.userService.removeWhitelistedUser(req, body);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("users/:userId/nfts")
  async getUserMintedNFTs(
    @Req() req,
    @Param() params: UserParamsDto,
    @Query() query: QueryParamsDto
  ) {
    return await this.userService.getUserMintedNFTsById(
      req,
      params.userId,
      query
    );
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("users/:userId/nfts-list")
  async getUserMintedNFTsList(@Req() req, @Param() params: UserParamsDto) {
    return await this.userService.getUserMintedNFTsList(req, params.userId);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("users/:userId/asociated-nfts")
  async getUserAssociatedNFTsWithDetails(
    @Req() req,
    @Param() params: UserParamsDto
  ) {
    return await this.userService.getUserAssociatedNFTsWithDetails(
      req,
      params.userId
    );
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("user/updateProfile")
  @ApiResponse({
    status: 201,
    description: "To update profile",
  })
  async updateProfileById(@Body() body: updateProfileDto, @Req() req) {
    return await this.userService.updateProfileById(body, req.user);
  }

  @Patch("user/email")
  @ApiResponse({
    status: 201,
    description: "To update profile",
  })
  async sendEmail(@Req() req) {
    return await this.userService.sendEmail();
  }



  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Patch("users/:userId")
  @ApiResponse({
    status: 201,
    description: "To update status",
  })
  async updateUser(
    @Req() req,
    @Param() params: UserParamsDto,
    @Body() body: UpdateUserDto
  ) {
    return await this.userService.updateUser(req, params.userId, body);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("users")
  async getAllUsers(@Query() query: getAllUsersDto) {
    return this.userService.getAllUsers(query);
  }

  @UseGuards(AuthGuard('jwt'), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get('users/export')
  async getAllUsersExport(@Query() query: getAllUsersDto, @Res() res: Response) {
    const { users } = await this.userService.getAllUsers(query);

    return this.utilsService.generateCsvResponse(res,users,"user.csv")
   
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("users/:userId")
  async getUserDetails(@Param() params: UserParamsDto) {
    return this.userService.getUserDetails(params.userId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("user/me")
  @ApiResponse({
    status: 200,
    description: "To get profile",
  })
  async getMe(@Req() req) {
    return await this.userService.getMe(req.user);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("user/isUserNameExist")
  @ApiResponse({
    status: 200,
    description: "To check username exist",
  })
  async checkUserName(@Query() query: checkUsernameDto, @Req() req) {
    return await this.userService.checkUserName(query, req.user);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("user/isUserEmailExist")
  @ApiResponse({
    status: 200,
    description: "To check email exist",
  })
  async checkUserEmail(@Query() query: checkUserEmailDto, @Req() req) {
    return await this.userService.checkUserEmail(query, req.user);
  }

  @Get("user/validate-account/:walletAddress")
  @ApiResponse({
    status: 200,
    description: "To validate token of connected wallet",
  })
  async validateToken(
    @Param("walletAddress") walletAddress: string,
    @Headers("authorization") token: string,
    @Req() req
  ) {
    return await this.userService.validateToken(req, token, walletAddress);
  }

  // Get All NFTs of Celebrities by celebrityIds
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("celebrities/nfts")
  async getAllNftsOfCelebrities(
    @Req() req,
    @Query() query: GetAllNftsQueryDto
  ) {
    return await this.userService.getAllNftsByCelebrityIds(req, query);
  }

  /* ==============================================DAPP APIs============================================*/

  // Get All Minted NFTs nft Holder or Associated NFTs of Managers/Sub-Admins
  @UseGuards(
    AuthGuard("jwt"),
    new RoleGuard([Role.MANAGER, Role.USER, Role.SUBADMIN])
  )
  @Get("dapp/users/nfts")
  async getUserMintedOrAssociatedNFTs(
    @Req() req,
    @Query() query: QueryParamsDto
  ) {
    const { role } = req.user;
    if (role === Role.USER) {
      return await this.userService.getUserMintedNFTs(req, query);
    } else if (role === Role.MANAGER || role === Role.SUBADMIN) {
      return await this.userService.getCelebritiesNFTsAssociatedWithAgent(
        req,
        query
      );
    }
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("dapp/users/primary-nft")
  async updateUserPrimaryNFT(@Req() req, @Body() query: UpdatePrimaryNftDto) {
    return await this.userService.updateUserPrimaryNFT(req, query);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get('users/wallet-proofs')
  async getUserWalletProof(@Req() req) {
    return await this.userService.getUserWalletProof(req);
  }
}
