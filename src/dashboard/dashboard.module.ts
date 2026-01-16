import { Module } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { DashboardController } from "./dashboard.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { DashboardRepository } from "./dashboard.repository";
import { UserRepository } from "src/user/user.repository";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [DashboardController],
  providers: [
    DashboardService,
    PrismaService,
    DashboardRepository,
    UserRepository,
    JwtService
  ],
})
export class DashboardModule {}
