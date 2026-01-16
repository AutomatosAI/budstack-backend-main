import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { NftService } from "./nft.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetUsersQueryDto, getNftByTokenDto } from "./nft.dto";
import { AuthGuard } from "@nestjs/passport";
import { Client, Role } from "@prisma/client";
import { GetAllClientDto } from "src/client/dto";
import { RoleGuard } from "src/guard/roles.guard";
import { ClientService } from "src/client/client.service";
import { OrderService } from "src/order/order.service";
import { GetAllOrderDto } from "src/order/dto.order";
import { GetAllTransactionDto } from "src/transaction/transaction.dto";
import { TransactionService } from "src/transaction/transaction.service";
import { UserParamsDto } from "src/user/user.dto";
import { GetAllCommissionDto } from "src/commission/commission.dto";
import { LOGIN_TYPE } from "src/constants/enums";
import { AgentsCommissionSummary } from "src/common/response.dto";
import { DualAuthGuard } from "src/strategy/daap.jwt.strategy";
import { UtilsService } from "src/utils/utils.service";
import { Response } from "express";

@ApiTags("NFT")
@Controller("nfts")
export class NftController {
  constructor(
    private readonly nftService: NftService,
    private readonly clientService: ClientService,
    private readonly orderService: OrderService,
    private readonly transactionService: TransactionService,
    private readonly utilsService:UtilsService
  ) {}

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/list")
  async getAllNftsList(@Req() req) {
    return await this.nftService.getAllNftsList(req);
  }

  /**
   * Retrieves a list of all celebrities.
   * This method is protected by JWT authentication and role-based access control, allowing only users with the roles ADMIN or SUBADMIN to access it.
   *
   * @param req The request object containing user information.
   * @param query An object of type GetUsersQueryDto containing search criteria.
   * @returns A promise that resolves to a list of all celebrities.
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/celebrities-list")
  async getAllCelebrities(@Req() req, @Query() query: GetUsersQueryDto) {
    return await this.nftService.getAllCelebritiesList(req, query);
  }

  /**
   * Retrieves detailed information about an NFT, including its ownership history, based on the provided token ID.
   * @param req The request object containing user information.
   * @param param An object of type `getNftByTokenDto` containing the token ID of the NFT.
   * @returns A promise that resolves to the details of the NFT, including its ownership history.
   */
  @UseGuards(DualAuthGuard)
  @Get("/:tokenId")
  async GetTokenDetailsWithOwnersHistory(
    @Req() req,
    @Param() param: getNftByTokenDto
  ) {
    return await this.nftService.GetTokenDetailsWithOwnersHistory(
      req,
      param.tokenId
    );
  }

  /* ==================================== Admin Panel APIs ==================================== */

  /**
   * Retrieves a summary of a specific NFT identified by its token ID.
   * This method is protected by JWT authentication and role-based access control, allowing only users with the roles `ADMIN` or `SUBADMIN` to access it.
   *
   * @param param An object of type `getNftByTokenDto` containing the `tokenId` of the NFT.
   * @returns A promise that resolves to the summary of the specified NFT.
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/:tokenId/summary")
  async getDappSummaryByNftId(@Param() param: getNftByTokenDto) {
    return await this.nftService.getDappSummaryByNftId(param.tokenId);
  }

  /**
   * Retrieves the holder information of a specific NFT based on its token ID.
   * This method is protected by JWT authentication and role-based access control, ensuring that only users with the roles `ADMIN` or `SUBADMIN` can access it.
   *
   * @param param An object of type `getNftByTokenDto` containing the `tokenId` of the NFT.
   * @returns A promise that resolves to the holder information of the specified NFT.
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/:tokenId/holder")
  async getHolderByNftId(@Param() param: getNftByTokenDto) {
    return await this.nftService.getHolderByNftId(param.tokenId);
  }

  /**
   * Retrieves a list of clients associated with a specific NFT, identified by its token ID.
   * This method is protected by JWT authentication and role-based access control, ensuring that only users with the roles `ADMIN` or `SUBADMIN` can access it.
   *
   * @param req The request object containing user information.
   * @param param An object of type `getNftByTokenDto` containing the `tokenId` of the NFT.
   * @param query An object of type `GetAllClientDto` containing filters and search criteria for fetching clients.
   * @returns A promise that resolves to a list of clients associated with the specified NFT.
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/:tokenId/clients")
  async getAllClientsByNftId(
    @Req() req,
    @Param() param: getNftByTokenDto,
    @Query() query: GetAllClientDto
  ): Promise<{ clients: Client[]; paginationCount: number }> {
    return this.clientService.getAllClients(
      req,
      LOGIN_TYPE.ADMIN,
      query,
      param.tokenId
    );
  }

  /**
   * Retrieves a list of clients associated with a specific NFT, identified by its token ID.
   * This method is protected by JWT authentication and role-based access control, ensuring that only users with the roles `ADMIN` or `SUBADMIN` can access it.
   *
   * @param req The request object containing user information.
   * @param param An object of type `getNftByTokenDto` containing the `tokenId` of the NFT.
   * @param query An object of type `GetAllClientDto` containing filters and search criteria for fetching clients.
   * @returns a csv file list of clients associated with the specified NFT.
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/:tokenId/clients/export")
  async getAllClientsByNftIdExport(
    @Req() req,
    @Param() param: getNftByTokenDto,
    @Query() query: GetAllClientDto,
    @Res() res:Response
  ){
    const {clients}=await this.clientService.getAllClients(
      req,
      LOGIN_TYPE.ADMIN,
      query,
      param.tokenId
    );

    return this.utilsService.generateCsvResponse(res,clients,"clients.csv,")
  }

  /**
   * Retrieves all orders associated with a specific NFT identified by its token ID.
   * This method is protected by JWT authentication and role-based access control.
   * @param req The request object containing user information.
   * @param param An object of type 'getNftByTokenDto' containing the 'tokenId' of the NFT.
   * @param query An object of type 'GetAllOrderDto' containing filters and search criteria for fetching orders.
   * @returns A promise that resolves to a list of orders associated with the specified NFT.
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/:tokenId/orders")
  async getAllOrdersByNftId(
    @Req() req,
    @Param() param: getNftByTokenDto,
    @Query() query: GetAllOrderDto
  ) {
    return await this.orderService.getAllOrders(
      req,
      LOGIN_TYPE.ADMIN,
      query,
      param.tokenId
    );
  }
  /**
   * Retrieves all orders associated with a specific NFT identified by its token ID, returns csv file.
   * This method is protected by JWT authentication and role-based access control.
   * @param req The request object containing user information.
   * @param param An object of type 'getNftByTokenDto' containing the 'tokenId' of the NFT.
   * @param query An object of type 'GetAllOrderDto' containing filters and search criteria for fetching orders.
   * @returns A csv file list of orders associated with the specified NFT.
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/:tokenId/orders/export")
  async getAllOrdersByNftIdExport(
    @Req() req,
    @Param() param: getNftByTokenDto,
    @Query() query: GetAllOrderDto,
    @Res() res:Response
  ) {
    const {orders}= await this.orderService.getAllOrders(
      req,
      LOGIN_TYPE.ADMIN,
      query,
      param.tokenId
    );

    return this.utilsService.generateCsvResponse(res,orders,"Orders.csv")

    
  }

  /**
   * Retrieves all transactions associated with a specific NFT identified by its token ID.
   * Uses JWT authentication and role-based access control to ensure only users with roles ADMIN or SUBADMIN can access this information.
   *
   * @param req The request object containing user information.
   * @param param An object of type getNftByTokenDto containing the tokenId of the NFT.
   * @param query An object of type GetAllTransactionDto containing filters and search criteria for fetching transactions.
   * @returns A promise that resolves to a list of transactions associated with the specified NFT.
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/:tokenId/transactions")
  async GetAllTransactionsByNftId(
    @Req() req,
    @Param() param: getNftByTokenDto,
    @Query() query: GetAllTransactionDto
  ) {
    return await this.transactionService.GetAllTransactionsByNftId(
      req,
      query,
      param.tokenId
    );
  }
  /**
   * Retrieves all transactions associated with a specific NFT identified by its token ID.
   * Uses JWT authentication and role-based access control to ensure only users with roles ADMIN or SUBADMIN can access this information.
   *
   * @param req The request object containing user information.
   * @param param An object of type getNftByTokenDto containing the tokenId of the NFT.
   * @param query An object of type GetAllTransactionDto containing filters and search criteria for fetching transactions.
   * @returns A csv File list of transactions associated with the specified NFT.
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/:tokenId/transactions/exports")
  async GetAllTransactionsByNftIdExports(
    @Req() req,
    @Param() param: getNftByTokenDto,
    @Query() query: GetAllTransactionDto,
    @Res() res:Response
  ) {
    const {transactions}= await this.transactionService.GetAllTransactionsByNftId(
      req,
      query,
      param.tokenId
    );

    return this.utilsService.generateCsvResponse(res,transactions,"Transactions.csv")
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/:tokenId/commissions/holder/summary") // to get nft holder commission summary
  async getCommissionsSummaryByNftId(
    @Req() req,
    @Param() param: getNftByTokenDto
  ): Promise<AgentsCommissionSummary> {
    return await this.nftService.getCommissionSummary(
      req,
      param.tokenId,
      undefined,
      undefined
    );
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/:tokenId/commissions/managers/:userId/summary") // to get nft specific manager's commission summary
  async getAgentCommissionsSummaryByNftId(
    @Req() req,
    @Param() nftParam: getNftByTokenDto,
    @Param() userParam: UserParamsDto
  ): Promise<AgentsCommissionSummary> {
    return await this.nftService.getCommissionSummary(
      req,
      nftParam.tokenId,
      userParam.userId,
      undefined
    );
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/:tokenId/commissions/holder") // to get nft holder commission summary
  async getHolderCommissionsByNftId(
    @Req() req,
    @Param() param: getNftByTokenDto,
    @Query() query: GetAllCommissionDto
  ) {
    return await this.nftService.getHolderCommissionsByNftId(
      req,
      param.tokenId,
      query
    );
  }
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/:tokenId/commissions/holder/export") // to get nft holder commission summary
  async getHolderCommissionsByNftIdExport(
    @Req() req,
    @Param() param: getNftByTokenDto,
    @Query() query: GetAllCommissionDto,
    @Res() res:Response
  ) {
    const {commissions}= await this.nftService.getHolderCommissionsByNftId(
      req,
      param.tokenId,
      query
    );
    return this.utilsService.generateCsvResponse(res,commissions,"Commissions.csv")
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/:tokenId/commissions/managers/:userId") // to get nft holder commission summary
  async getManagerCommissionsByNftId(
    @Req() req,
    @Param() nftParam: getNftByTokenDto,
    @Param() userParam: UserParamsDto,
    @Query() query: GetAllCommissionDto
  ) {
    return await this.nftService.getManagerCommissionsByNftId(
      req,
      nftParam.tokenId,
      userParam.userId,
      query
    );
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/:tokenId/commissions/managers/:userId/export") 
  async getManagerCommissionsByNftIdExport(
    @Req() req,
    @Param() nftParam: getNftByTokenDto,
    @Param() userParam: UserParamsDto,
    @Query() query: GetAllCommissionDto,
    @Res() res:Response
  ) {
    const {commissions}= await this.nftService.getManagerCommissionsByNftId(
      req,
      nftParam.tokenId,
      userParam.userId,
      query
    );

    return this.utilsService.generateCsvResponse(res,commissions,"commission.csv")
  }
}
