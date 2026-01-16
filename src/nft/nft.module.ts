import { Module } from "@nestjs/common";
import { NftService } from "./nft.service";
import { NftController } from "./nft.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { NftRepository } from "./nft.repository";
import { AuthRepository } from "src/auth/auth.repository";
import { ClientService } from "src/client/client.service";
import { ClientRepository } from "src/client/client.repository";
import { EmailService } from "src/email/email.service";
import { OrderService } from "src/order/order.service";
import { OrderRepository } from "src/order/order.repository";
import { TransactionService } from "src/transaction/transaction.service";
import { TransactionRepository } from "src/transaction/transaction.repository";
import { UtilsService } from "src/utils/utils.service";
import { JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "src/strategy/jwt.strategy";
import { HttpModule } from "@nestjs/axios";
import { UserRepository } from "src/user/user.repository";
import { CommissionService } from "src/commission/commission.service";
import { CommissionRepository } from "src/commission/commission.repository";
import { KycService } from "src/kyc/kyc.service";
import { CacheModule } from "@nestjs/cache-manager";
import { KycRepository } from "src/kyc/kyc.repository";
import { NotificationsService } from "src/notifications/notifications.service";
import { NotificationsRepository } from "src/notifications/notifications.repository";
import { PaymentsService } from "src/payments/payments.service";
import { PaymentsRepository } from "src/payments/payments.repository";

@Module({
  imports: [
    HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
    CacheModule.register({ttl: 82800000}),
  ],
  controllers: [NftController],
  providers: [
    NftService,
    PrismaService,
    NftRepository,
    AuthRepository,
    ClientService,
    ClientRepository,
    EmailService,
    OrderService,
    OrderRepository,
    TransactionService,
    TransactionRepository,
    UtilsService,
    JwtStrategy,
    JwtService,
    UserRepository,
    CommissionService,
    CommissionRepository,
    KycService,
    KycRepository,
    NotificationsService,
    NotificationsRepository,
    PaymentsService,
    PaymentsRepository
  ],
  exports: [NftRepository],
})
export class NftModule {}
