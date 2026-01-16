import { Body, Controller, Get, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { SaleService } from './sale.service';
import { createSaleDto, filterByRevenueChartDto, getAllSaleDto, GetAllStrainsRevenueDto, SaleIdDto, updateSaleDto } from './sale.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { RoleGuard } from 'src/guard/roles.guard';
import { LOGIN_TYPE } from 'src/constants/enums';
import { DualAuthGuard } from 'src/strategy/daap.jwt.strategy';
import { UtilsService } from 'src/utils/utils.service';
import { Response } from 'express';

@Controller('')
export class SaleController {
  constructor(private readonly saleService: SaleService,private utilsService:UtilsService) {}

  @UseGuards(AuthGuard('jwt'), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get('sales/summary')
  async getAllSalesSummary(@Req() req) {
    return this.saleService.getSalesSummary(req.user);
  }

  @UseGuards(AuthGuard('jwt'), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get('revenue/summary')
  async getSalesRevenueSummary(@Req() req) {
    return this.saleService.getSalesRevenueSummary(req, LOGIN_TYPE.ADMIN);
  }

  @UseGuards(AuthGuard('jwt'), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get('revenue/chart-data')
  async getRevenueChartData(@Req() req, @Query() query: filterByRevenueChartDto) {
    return this.saleService.getRevenueChartData(req, LOGIN_TYPE.ADMIN, query);
  }

  @UseGuards(AuthGuard('jwt'), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get('revenue')
  async getAllStrainsWithRevenue(@Req() req, @Query() query: GetAllStrainsRevenueDto) {
    return this.saleService.getAllStrainsWithRevenue(req, LOGIN_TYPE.ADMIN, query);
  }

  @UseGuards(AuthGuard('jwt'), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get('revenue/export')
  async getAllStrainsWithRevenueExport(@Req() req, @Query() query: GetAllStrainsRevenueDto,@Res() res:Response) {
    const {strains}=await this.saleService.getAllStrainsWithRevenue(req, LOGIN_TYPE.ADMIN, query);

    return this.utilsService.generateCsvResponse(res,strains,"strain_revenue.csv")


  }
  
  // TODO: this api no more required as sales is gonna be automated
  // sales lead first created when client is created then everytime for client order sales would be in ONGOING state
  @Post("dapp/sales")
  async createSale(@Body() createSaleDto: createSaleDto) {
    return this.saleService.create(createSaleDto);
  }

  @UseGuards(DualAuthGuard)
  @Get("dapp/sales")
  async getAllSales(@Query() query:getAllSaleDto, @Req() req) {
    return this.saleService.getAllSales(query, req.user);
  }

  @UseGuards(DualAuthGuard)
  @Get('dapp/sales/summary')
  async getSalesSummary(@Req() req) {
    return this.saleService.getClientsSalesSummary(req.user);
  }

  @UseGuards(DualAuthGuard)
  @Get('dapp/revenue')
  async getDappAllStrainsWithRevenue(@Req() req, @Query() query: GetAllStrainsRevenueDto) {
    return this.saleService.getAllStrainsWithRevenue(req, LOGIN_TYPE.DAPP, query);
  }

  @UseGuards(DualAuthGuard)
  @Get('dapp/revenue/summary')
  async getDappSalesRevenueSummary(@Req() req) {
    return this.saleService.getSalesRevenueSummary(req, LOGIN_TYPE.DAPP);
  }

  @UseGuards(DualAuthGuard)
  @Get('dapp/revenue/chart-data')
  async getDappRevenueChartData(@Req() req, @Query() query: filterByRevenueChartDto) {
    return this.saleService.getRevenueChartData(req, LOGIN_TYPE.DAPP, query);
  }

  @Patch("dapp/sales")
  async updateSaleById(@Query() query: SaleIdDto, @Body() body: updateSaleDto) {
    return await this.saleService.updateSaleById(query, body);
  }
}
