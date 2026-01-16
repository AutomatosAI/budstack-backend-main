import {
  BadRequestException,
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

import { OrderService } from "./order.service";
import {
  GetAllOrderDto,
  OrderIdDto,
  CreateOrderDto,
  filterByClientsDto,
  updateOrderStatusDto,
  OrdersApprovalDto,
  OrdersRejectionDto,
  OrderIdsDto,
  OrderIdsQuery,
  UpdateOrdersStatusDto,
} from "./dto.order";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "@prisma/client";
import { RoleGuard } from "src/guard/roles.guard";
import { PaginationDto } from "src/constants/dto";
import { ClientIdParams } from "src/client/dto/request.dto";
import { LOGIN_TYPE } from "src/constants/enums";
import { CommissionStatusDto } from "src/commission/commission.dto";
import { DualAuthGuard } from "src/strategy/daap.jwt.strategy";
import { Response } from "express";
import { UtilsService } from "src/utils/utils.service";

@Controller("")
export class OrderController {
  constructor(private readonly orderService: OrderService, private readonly utilsService:UtilsService) {}

  @UseGuards(DualAuthGuard, new RoleGuard([Role.SUBADMIN, Role.USER]))
  @Post("dapp/orders")
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    return this.orderService.createOrder(createOrderDto, req.user);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/orders")
  async getAllOrders(@Query() query: GetAllOrderDto, @Req() req) {
    return this.orderService.getAllOrders(
      req,
      LOGIN_TYPE.ADMIN,
      query,
      undefined
    );
  }

 @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/orders/export")
  async getAllOrdersExport(@Query() query: GetAllOrderDto, @Req() req,@Res() res:Response) {
    const {orders}=await this.orderService.getAllOrders(
      req,
      LOGIN_TYPE.ADMIN,
      query,
      undefined
    );

    return this.utilsService.generateCsvResponse(res,orders,"Orders.csv")
   

  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("orders/summary")
  async getOrdersSummary(@Req() req) {
    return this.orderService.getOrdersSummary(req, LOGIN_TYPE.ADMIN);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("orders/chart-data")
  async getOrdersChartData(@Req() req, @Query() query: filterByClientsDto) {
    return await this.orderService.getOrdersChartData(
      req,
      LOGIN_TYPE.ADMIN,
      query
    );
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("orders/status-breakdown")
  async getOrdersStatusBreakdown(
    @Req() req,
    @Query() query: filterByClientsDto
  ) {
    return await this.orderService.getOrdersStatusBreakdown(
      req,
      LOGIN_TYPE.ADMIN,
      query
    );
  }

  @Get("orders/commission-recipients")
  async getCommissionRecipients(@Query() query: OrderIdsQuery, @Req() req) {
    try {
      return this.orderService.getCommissionRecipients(req, query);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Patch("/orders/approve")
  async approveOrders(@Req() req, @Body() body: OrdersApprovalDto) {
    return await this.orderService.approveOrders(req, body);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Patch("/orders/reject")
  async rejectOrders(@Req() req, @Body() body: OrdersRejectionDto) {
    return await this.orderService.rejectOrders(req, body);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Patch("/orders/status")
  async updateOrdersStatus(@Req() req, @Body() body: UpdateOrdersStatusDto) {
    return await this.orderService.updateOrdersStatus(req, body);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Patch("/orders/:orderId")
  async updateOrderStatus(
    @Req() req,
    @Param() params: OrderIdDto,
    @Body() body: updateOrderStatusDto
  ) {
    return await this.orderService.updateOrderStatus(req, params.orderId, body);
  }

  @UseGuards(DualAuthGuard)
  @Get("dapp/orders")
  async getAllOrdersByNftId(@Query() query: GetAllOrderDto, @Req() req) {
    return this.orderService.getAllOrders(
      req,
      LOGIN_TYPE.DAPP,
      query,
      undefined
    );
  }

  @UseGuards(DualAuthGuard)
  @Get("dapp/orders/recent")
  async getRecentOrders(@Query() query: PaginationDto, @Req() req) {
    return this.orderService.getRecentOrders(query, req.user);
  }

  @UseGuards(DualAuthGuard)
  @Get("dapp/orders/summary")
  async getDappOrdersSummary(@Req() req) {
    return this.orderService.getOrdersSummary(req, LOGIN_TYPE.DAPP);
  }

  @UseGuards(DualAuthGuard)
  @Get("dapp/orders/chart-data")
  async getDappOrdersChartData(@Req() req, @Query() query: filterByClientsDto) {
    return await this.orderService.getOrdersChartData(
      req,
      LOGIN_TYPE.DAPP,
      query
    );
  }

  @UseGuards(DualAuthGuard)
  @Get("dapp/orders/status-breakdown")
  async getDappOrdersStatusBreakdown(
    @Req() req,
    @Query() query: filterByClientsDto
  ) {
    return await this.orderService.getOrdersStatusBreakdown(
      req,
      LOGIN_TYPE.DAPP,
      query
    );
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("orders/:orderId")
  async getOrderById(@Param() params: OrderIdDto, @Req() req) {
    return this.orderService.getOrderById(req, undefined, params.orderId);
  }

  @UseGuards(DualAuthGuard)
  @Get("dapp/orders/:orderId")
  async getDappOrderById(@Param() params: OrderIdDto, @Req() req) {
    return this.orderService.getOrderById(req, undefined, params.orderId);
  }

  @Patch("orders/commission/status")
  async updateCommissionStatus(@Body() body: CommissionStatusDto, @Req() req) {
    try {
      return this.orderService.updateCommissionStatus(req, body);
    } catch (error) {
      throw error;
    }
  }
}
