import { Module } from "@nestjs/common";
import { ClientService } from "./client.service";
import { ClientController } from "./client.controller";
import { ClientRepository } from "./client.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRepository } from "src/auth/auth.repository";
import { EmailService } from "src/email/email.service";
import { UtilsService } from "src/utils/utils.service";
import { JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "src/strategy/jwt.strategy";
import { HttpModule } from "@nestjs/axios";
import { UserRepository } from "src/user/user.repository";
import { TransactionService } from "src/transaction/transaction.service";
import { TransactionRepository } from "src/transaction/transaction.repository";
import { OrderService } from "src/order/order.service";
import { OrderRepository } from "src/order/order.repository";
import { KycService } from "src/kyc/kyc.service";
import { KycRepository } from "src/kyc/kyc.repository";
import { CacheModule } from "@nestjs/cache-manager";
import { CommissionRepository } from "src/commission/commission.repository";
import { NotificationsService } from "src/notifications/notifications.service";
import { NotificationsRepository } from "src/notifications/notifications.repository";
import { PaymentsRepository } from "src/payments/payments.repository";
import { PaymentsService } from "src/payments/payments.service";

@Module({
  imports: [
    HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
    CacheModule.register({ ttl: 82800000 }),
  ],
  controllers: [ClientController],
  providers: [
    ClientService,
    ClientRepository,
    AuthRepository,
    PrismaService,
    EmailService,
    UtilsService,
    JwtService,
    JwtStrategy,
    UserRepository,
    TransactionService,
    TransactionRepository,
    OrderService,
    OrderRepository,
    KycService,
    KycRepository,
    CommissionRepository,
    NotificationsService,
    NotificationsRepository,
    PaymentsService,
    PaymentsRepository
  ],
})
export class ClientModule {}
