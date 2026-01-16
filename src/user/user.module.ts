import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { JwtStrategy } from "src/strategy/jwt.strategy";
import { AuthRepository } from "src/auth/auth.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { UserRepository } from "./user.repository";
import { EmailService } from "src/email/email.service";
import { JwtService } from "@nestjs/jwt";
import { UtilsService } from "src/utils/utils.service";
import { HttpModule } from "@nestjs/axios";
import { OrderRepository } from "src/order/order.repository";
import { CommissionRepository } from "src/commission/commission.repository";

@Module({
  imports: [HttpModule.register({ timeout: 10000, maxRedirects: 5 })],
  controllers: [UserController],
  providers: [
    UserService,
    JwtStrategy,
    AuthRepository,
    PrismaService,
    UserRepository,
    EmailService,
    JwtService,
    UtilsService,
    UserRepository,
    OrderRepository,
    CommissionRepository
  ],
})
export class UserModule {}
