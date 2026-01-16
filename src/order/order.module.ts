import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { OrderRepository } from "./order.repository";
import { ClientRepository } from "src/client/client.repository";
import { UtilsService } from "src/utils/utils.service";
import { JwtService } from "@nestjs/jwt";
import { EmailService } from "src/email/email.service";
import { HttpModule } from "@nestjs/axios";
import { UserRepository } from "src/user/user.repository";
import { CommissionRepository } from "src/commission/commission.repository";
import { NotificationsService } from "src/notifications/notifications.service";
import { NotificationsRepository } from "src/notifications/notifications.repository";
import { PaymentsService } from "src/payments/payments.service";
import { PaymentsRepository } from "src/payments/payments.repository";

@Module({
  imports: [HttpModule.register({ timeout: 5000, maxRedirects: 5 })],
  controllers: [OrderController],
  providers: [
    OrderService,
    PrismaService,
    OrderRepository,
    ClientRepository,
    UtilsService,
    JwtService,
    EmailService,
    UserRepository,
    CommissionRepository,
    NotificationsService,
    NotificationsRepository,
    PaymentsService,
    PaymentsRepository
  ],
})
export class OrderModule {}
