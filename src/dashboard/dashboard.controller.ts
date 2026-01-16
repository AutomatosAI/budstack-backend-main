import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiResponse } from '@nestjs/swagger';
import { AnalyticsDto } from './dashboard.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { RoleGuard } from 'src/guard/roles.guard';
import { DualAuthGuard } from 'src/strategy/daap.jwt.strategy';

@Controller('')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(AuthGuard('jwt'), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get('/dashboard/summary')
  @ApiResponse({
    status: 200,
    description: 'To get summary of Admin Dashboard'
  })
  async getSummary(@Req() req) {
    return this.dashboardService.getSummary(req);
  }

  @UseGuards(DualAuthGuard)
  @Get('dapp/dashboard/summary')
  @ApiResponse({
    status: 200,
    description: 'To get summary of DAPP dashboard',
  })
  async getDappSummary(@Req() req) {
    return await this.dashboardService.getDappSummary(req.user);
  }


  @UseGuards(DualAuthGuard)
  @Get('dapp/dashboard/analytics')
  @ApiResponse({
    status: 200,
    description: 'To get analytics',
  })
  async getAnalytics(@Query() query: AnalyticsDto, @Req() req) {
    return await this.dashboardService.getAnalytics(query, req.user);
  }
}
