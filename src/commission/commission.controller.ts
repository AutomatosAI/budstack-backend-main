import { Controller, Get, Param, Query, Req, Res, UseGuards } from "@nestjs/common";
import { CommissionService } from "./commission.service";
import { AuthGuard } from "@nestjs/passport";
import {
  GetAllCommissionDto,
  GetAllAgentCommissionDto,
} from "./commission.dto";
import { RoleGuard } from "src/guard/roles.guard";
import { Role } from "@prisma/client";
import { LOGIN_TYPE } from "src/constants/enums";
import { STATUS, UserParamsDto } from "src/user/user.dto";
import { Cron, CronExpression } from "@nestjs/schedule";
import {
  AgentsCommissionSummary,
  CommissionSummary,
} from "src/common/response.dto";
import { DualAuthGuard } from "src/strategy/daap.jwt.strategy";
import { Response } from "express";
import { UtilsService } from "src/utils/utils.service";

@Controller("")
export class CommissionController {
  constructor(private readonly commissionService: CommissionService,private readonly utilsService:UtilsService) {}

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("commissions/summary")
  async getAllCommissionSummary(
    @Req() req
  ): Promise<{ commissionSummary: CommissionSummary }> {
    return await this.commissionService.getAllCommissionSummary(req);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("commissions/managers/summary")
  async getAgentsCommissionSummary(
    @Req() req
  ): Promise<{ summary: AgentsCommissionSummary }> {
    return this.commissionService.getAgentsCommissionSummary(
      req,
      LOGIN_TYPE.ADMIN,
      undefined
    );
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("commissions/managers")
  async getAllAgentsWithCommission(
    @Req() req,
    @Query() query: GetAllAgentCommissionDto
  ): Promise<{managers: any, paginationCount: number}> {
    return this.commissionService.getAllAgentsWithCommission(
      req,
      LOGIN_TYPE.ADMIN,
      query
    );
  }
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("commissions/managers/export")
  async getAllAgentsWithCommissionExport(
    @Req() req,
    @Query() query: GetAllAgentCommissionDto,
    @Res() res:Response
  ){
    const {managers}= await this.commissionService.getAllAgentsWithCommission(
      req,
      LOGIN_TYPE.ADMIN,
      query
    );
    return this.utilsService.generateCsvResponse(res,managers,"Manager.csv")
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/commissions/managers/:userId") // to get nft holder commission summary 
  async getManagerCommissionsByNftId(
    @Req() req,
    @Param() userParam: UserParamsDto,
    @Query() query: GetAllCommissionDto
  ): Promise<{ commissions: any[]; paginationCount: number }> {
    return await this.commissionService.getAllCommissions(query, undefined, {
      id: userParam.userId,
    });
  }
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("/commissions/managers/:userId/export")
  async getManagerCommissionsByNftIdExport(
    @Req() req,
    @Param() userParam: UserParamsDto,
    @Query() query: GetAllCommissionDto,
    @Res() res:Response
  ) {
    const {commissions}= await this.commissionService.getAllCommissions(query, undefined, {
      id: userParam.userId,
    });

    return this.utilsService.generateCsvResponse(res,commissions,"Commission.csv")
  }

  @UseGuards(DualAuthGuard)
  @Get("dapp/commissions")
  async getAllCommissions(
    @Query() query: GetAllCommissionDto,
    @Req() req
  ): Promise<{ commissions: any[]; paginationCount: number }> {
    return this.commissionService.getAllCommissions(query, undefined, req.user);
  }

  @UseGuards(DualAuthGuard)
  @Get("dapp/commissions/summary")
  async getSummary(
    @Req() req
  ): Promise<{ commissionSummary: CommissionSummary }> {
    return this.commissionService.getSummary(
      req.user.id,
      req.user.primaryNftId
    );
  }

  @UseGuards(DualAuthGuard)
  @Get("dapp/commissions/managers/summary")
  async getDappAgentsCommissionSummary(
    @Req() req,
    @Query("agentStatus") agentStatus: STATUS
  ): Promise<{ summary: AgentsCommissionSummary }> {
    return this.commissionService.getAgentsCommissionSummary(
      req,
      LOGIN_TYPE.DAPP,
      agentStatus
    );
  }

  @UseGuards(DualAuthGuard)
  @Get("dapp/commissions/managers")
  async getDappAllAgentsWithCommission(
    @Req() req,
    @Query() query: GetAllAgentCommissionDto
  ): Promise<{managers: any, paginationCount: number}> {
    return this.commissionService.getAllAgentsWithCommission(
      req,
      LOGIN_TYPE.DAPP,
      query
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cronJobToUpdateEthPrice() {
    return await this.commissionService.cronJobToUpdateEthPrice();
  }
}
