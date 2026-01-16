import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  Req,
  Res,
} from "@nestjs/common";
import { ClientService } from "./client.service";
import {
  CreateClientDto,
  GetAllClientDto,
  ClientIdParams,
  UpdateClientDto,
  filterByCountryDto,
  updateClientStatusDto,
  ClientQueryFilter,
  ClientApprovalDto,
  ClientRejectionDto,
  ClientOrderIdParams,
} from "./dto/request.dto";
import { AuthGuard } from "@nestjs/passport";
import { RoleGuard } from "src/guard/roles.guard";
import { Client, Role } from "@prisma/client";
import { GetAllTransactionByClientDto } from "src/transaction/transaction.dto";
import { TransactionService } from "src/transaction/transaction.service";
import { GetAllOrderDto } from "src/order/dto.order";
import { OrderService } from "src/order/order.service";
import { LOGIN_TYPE } from "src/constants/enums";
import { ClientsSummary } from "src/common/response.dto";
import { DualAuthGuard } from "src/strategy/daap.jwt.strategy";
import { Response } from "express";
import { UtilsService } from "src/utils/utils.service";

/**
 * Controller managing client-related operations such as creation, retrieval, updating, and summarizing client data.
 * Uses guards for authentication and authorization to control access to specific endpoints.
 */
@Controller("")
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly transactionService: TransactionService,
    private readonly orderService: OrderService,
    private readonly utilsService:UtilsService
  ) { }

  /**
   * Creates a new client using the provided DTO and user details from the request.
   * @param createClientDto - Data to create a new client.
   * @param req - Request object containing user details.
   * @returns The newly created client.
   */
  @UseGuards(DualAuthGuard, new RoleGuard([Role.SUBADMIN, Role.USER]))
  @Post("dapp/clients")
  async createClient(
    @Body() createClientDto: CreateClientDto,
    @Req() req
  ): Promise<{ client: Client; message: string }> {
    return this.clientService.createClient(createClientDto, req.user);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("clients")
  async getAllClients(
    @Query() query: GetAllClientDto,
    @Req() req
  ): Promise<{ clients: Client[]; paginationCount: number }> {
    return this.clientService.getAllClients(
      req,
      LOGIN_TYPE.ADMIN,
      query,
      undefined
    );
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("clients/export")
  async getAllClientsExport(
    @Query() query: GetAllClientDto,

    @Req() req,
    @Res() res:Response
  ){
    const { clients } = await this.clientService.getAllClients(
      req,
      LOGIN_TYPE.ADMIN,
      query,
      undefined
    );

    return this.utilsService.generateCsvResponse(res,clients,"clients.csv")
   


  }

  /**
   * Retrieves a summary of all clients potentially with different access controls.
   * @param req - Request object containing user details.
   * @returns Summary of all clients with potentially different access controls.
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("clients/summary")
  async getAllClientsSummary(@Req() req): Promise<{ summary: ClientsSummary }> {
    return this.clientService.getSummary(req.user, LOGIN_TYPE.ADMIN);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("clients/status-breakdown")
  async getClientsStatusBreakdown(
    @Req() req,
    @Query() query: filterByCountryDto
  ) {
    return await this.clientService.getClientsStatusBreakdown(
      req,
      LOGIN_TYPE.ADMIN,
      query
    );
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("clients/chart-data")
  async getClientsChartData(@Req() req, @Query() query: filterByCountryDto) {
    return await this.clientService.getClientChartData(
      req,
      LOGIN_TYPE.ADMIN,
      query
    );
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("clients/list")
  async getAllClientsList(
    @Req() req,
    @Query() query: ClientQueryFilter
  ): Promise<{ clients: Client[] }> {
    return this.clientService.getAllClientsList(
      req.user,
      LOGIN_TYPE.ADMIN,
      query
    );
  }

  /**
   * Retrieves the details of a specific client based on their ID.
   * Only authenticated users with the roles of ADMIN or SUBADMIN can access this endpoint.
   *
   * @param params An object containing the clientId which is a UUID string.
   * @param req The request object containing user details, particularly the user's role.
   * @returns Details of the client identified by the provided clientId.
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("clients/:clientId")
  async getClientDetails(@Param() params: ClientIdParams, @Req() req) {
    return this.clientService.getClientById(params, req.user);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Patch("/clients/approve")
  async approveClients(@Req() req, @Body() body: ClientApprovalDto) {
    return await this.clientService.approveClients(req, body);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Patch("/clients/reject")
  async rejectClients(@Req() req, @Body() body: ClientRejectionDto) {
    return await this.clientService.rejectClients(req, body);
  }

  /**
   * Updates the status of a client based on the provided client ID and status details.
   * Only authenticated users with the roles of ADMIN or SUBADMIN can perform this action.
   *
   * @param req The request object containing user details.
   * @param params An object containing the clientId which is a UUID string.
   * @param body An object containing the status details to update (isApproved, rejectionNote, isActive).
   * @returns A promise that resolves to the updated client status details.
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Patch("/clients/:clientId")
  async updateClientStatus(
    @Req() req,
    @Param() params: ClientIdParams,
    @Body() body: updateClientStatusDto
  ) {
    return await this.clientService.updateClientStatus(
      req,
      params.clientId,
      body
    );
  }

  /**
   * Retrieves orders for a specific client based on their ID, with optional query parameters for filtering in ADMIN.
   * This method is protected by authentication and role-based access control.
   *
   * @param req The request object containing user details.
   * @param params An object containing the clientId which is a UUID string.
   * @param query An object containing optional query parameters for filtering orders.
   * @returns A promise that resolves to the list of orders for the specified client, filtered based on the provided query parameters.
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/clients/:clientId/orders")
  async getClientOrders(
    @Req() req,
    @Param() params: ClientIdParams,
    @Query() query: GetAllOrderDto
  ) {
    return await this.orderService.getOrderByClientId(
      params.clientId,
      query,
      req.user
    );
  }

  /**
   * Retrieves orders and returns a csv file with all the records for a specific client based on their ID, with optional query parameters for filtering in ADMIN.
   * This method is protected by authentication and role-based access control.
   *
   * @param req The request object containing user details.
   * @param params An object containing the clientId which is a UUID string.
   * @param query An object containing optional query parameters for filtering orders.
   * @returns A promise that resolves to the list of orders for the specified client, filtered based on the provided query parameters.
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/clients/:clientId/orders/export")
  async getClientOrdersExport(
    @Req() req,
    @Param() params: ClientIdParams,
    @Query() query: GetAllOrderDto,
    @Res() res:Response,
  ) {
    const {orders}= await this.orderService.getOrderByClientId(
      params.clientId,
      query,
      req.user
    );

    return this.utilsService.generateCsvResponse(res,orders,"client_Orders.csv")
  }

  /**
   * Retrieves transactions for a specific client based on their ID in ADMIN.
   * Protected by authentication and role-based access control for ADMIN or SUBADMIN roles.
   *
   * @param req The request object containing user details.
   * @param params An object containing the clientId which is a UUID string.
   * @param query An object containing optional query parameters for filtering transactions.
   * @returns A promise that resolves to the list of transactions for the specified client, filtered based on the provided query parameters.
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/clients/:clientId/transactions")
  async getClientTransactions(
    @Req() req,
    @Param() params: ClientIdParams,
    @Query() query: GetAllTransactionByClientDto
  ) {
    return await this.transactionService.getTransactionByClient(
      params.clientId,
      query,
      req.user
    );
  }
  /**
   * Retrieves transactions returns a csv file with all the records  for a specific client based on their ID in ADMIN.
   * Protected by authentication and role-based access control for ADMIN or SUBADMIN roles.
   *
   * @param req The request object containing user details.
   * @param params An object containing the clientId which is a UUID string.
   * @param query An object containing optional query parameters for filtering transactions.
   * @returns A promise that resolves to the list of transactions for the specified client, filtered based on the provided query parameters.
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/clients/:clientId/transactions/export")
  async getClientTransactionsExport(
    @Req() req,
    @Param() params: ClientIdParams,
    @Query() query: GetAllTransactionByClientDto,
    @Res() res:Response,
  ) {
    const {transactions}= await this.transactionService.getTransactionByClient(
      params.clientId,
      query,
      req.user
    );

    return this.utilsService.generateCsvResponse(res,transactions,"Transactions.csv")
  }

  /**
   * Retrieves a list of all clients based on query parameters.
   * @param query - Query parameters for filtering clients.
   * @param req - Request object containing user details.
   * @returns A list of all clients based on the query.
   */
  @UseGuards(DualAuthGuard)
  @Get("dapp/clients")
  async getAllClientsByNftId(
    @Query() query: GetAllClientDto,
    @Req() req
  ): Promise<{ clients: Client[]; paginationCount: number }> {
    return this.clientService.getAllClients(
      req,
      LOGIN_TYPE.DAPP,
      query,
      undefined
    );
  }

  /**
   * Provides chart data for clients based on country filters.
   * @param req - Request object containing user details.
   * @param query - Country filter for the chart data.
   * @returns Chart data for clients based on the country filter.
   */
  @UseGuards(DualAuthGuard)
  @Get("dapp/clients/chart-data")
  async getDappClientsChartData(
    @Req() req,
    @Query() query: filterByCountryDto
  ) {
    return await this.clientService.getClientChartData(
      req,
      LOGIN_TYPE.DAPP,
      query
    );
  }

  /**
   * Offers a breakdown of client statuses over a specified date range.
   * @param req - Request object containing user details.
   * @param query - Date filter for the status breakdown.
   * @returns Breakdown of client statuses over the specified date range.
   */
  @UseGuards(DualAuthGuard)
  @Get("dapp/clients/status-breakdown")
  async getDappClientsStatusBreakdown(
    @Req() req,
    @Query() query: filterByCountryDto
  ) {
    return await this.clientService.getClientsStatusBreakdown(
      req,
      LOGIN_TYPE.DAPP,
      query
    );
  }

  /**
   * Retrieves a list of all clients with optional search functionality.
   * @param req - Request object containing user details.
   * @param search - Optional search query for filtering clients.
   * @returns A list of all clients based on the search query.
   */
  @UseGuards(DualAuthGuard)
  @Get("dapp/clients/list")
  async getDappAllClientsList(
    @Req() req,
    @Query() query: ClientQueryFilter
  ): Promise<{ clients: Client[] }> {
    return this.clientService.getAllClientsList(
      req.user,
      LOGIN_TYPE.DAPP,
      query
    );
  }

  /**
   * Summarizes client data for dashboard display.
   * @param req - Request object containing user details.
   * @returns Summary of client data for dashboard display.
   */
  @UseGuards(DualAuthGuard)
  @Get("dapp/clients/summary")
  async getClientsSummary(@Req() req): Promise<{ summary: ClientsSummary }> {
    return this.clientService.getSummary(req.user, LOGIN_TYPE.DAPP);
  }

  /**
   * Fetches a single client by their ID.
   * @param params - Parameters containing the client ID.
   * @param req - Request object containing user details.
   * @returns The client identified by the provided ID.
   */
  @UseGuards(DualAuthGuard)
  @Get("dapp/clients/:clientId")
  async getClientById(@Param() params: ClientIdParams, @Req() req) {
    return this.clientService.getClientById(params, req.user);
  }

  /**
   * Updates client details based on the provided ID and DTO.
   * @param params - Parameters containing the client ID.
   * @param updateClientDto - Data to update the client.
   * @param req - Request object containing user details.
   * @returns The updated client details.
   */
  @UseGuards(DualAuthGuard)
  @Patch("dapp/clients/:clientId")
  async updateClient(
    @Param() params: ClientIdParams,
    @Body() updateClientDto: UpdateClientDto,
    @Req() req
  ) {
    return this.clientService.updateClient(
      params.clientId,
      updateClientDto,
      req.user
    );
  }

  /**
   * Retrieves orders for a specific client based on their ID in DAPP.
   * Uses authentication and role-based access control to ensure only authorized users can access this information.
   *
   * @param params An object containing the clientId which is a UUID string.
   * @param query An object containing optional query parameters for filtering orders.
   * @param req The request object containing user details.
   * @returns A promise that resolves to the list of orders for the specified client, filtered based on the provided query parameters.
   */
  @UseGuards(DualAuthGuard)
  @Get("dapp/client/:clientId/orders")
  async GetOrdersByClientId(
    @Param() params: ClientIdParams,
    @Query() query: GetAllOrderDto,
    @Req() req
  ) {
    return this.orderService.getOrderByClientId(
      params.clientId,
      query,
      req.user
    );
  }

  @UseGuards(DualAuthGuard)
  @Get("/dapp/clients/:clientId/orders/:orderId")
  async getClientOrderDetails(
    @Req() req,
    @Param() params: ClientOrderIdParams
  ) {
    const { clientId, orderId } = params;
    return await this.orderService.getOrderById(req, clientId, orderId);
  }

  /**
   * Retrieves transactions for a specific client based on their ID in DAPP.
   * Uses authentication and role-based access control to ensure only authorized users can access this information.
   *
   * @param params An object containing the clientId which is a UUID string.
   * @param query An object containing optional query parameters for filtering transactions.
   * @param req The request object containing user details.
   * @returns A promise that resolves to the list of transactions for the specified client, filtered based on the provided query parameters.
   */
  @UseGuards(DualAuthGuard)
  @Get("dapp/client/:clientId/transactions")
  async getTransactionByClient(
    @Param() params: ClientIdParams,
    @Query() query: GetAllTransactionByClientDto,
    @Req() req
  ) {
    return this.transactionService.getTransactionByClient(
      params.clientId,
      query,
      req.user
    );
  }
}
