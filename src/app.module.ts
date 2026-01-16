import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { S3UploadModule } from "./s3-upload/s3Upload.module";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ResponseInterceptor } from "./interceptor/response.interceptor";
import { validate } from "./config";
import { PrismaService } from "./prisma/prisma.service";
import { AuthModule } from "./auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthRepository } from "./auth/auth.repository";
import { CONSTANT } from "src/constants";
import { UserModule } from "./user/user.module";
import { EventModule } from "./event/event.module";
import { StrainModule } from "./strain/strain.module";
import { NftModule } from "./nft/nft.module";
import { EmailService } from "./email/email.service";
import { UtilsService } from "./utils/utils.service";
import { SaleModule } from "./sale/sale.module";
import { OrderModule } from "./order/order.module";
import { ClientModule } from "./client/client.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { MarketplaceModule } from "./marketplace/marketplace.module";
import { TransactionModule } from "./transaction/transaction.module";
import { PlanetModule } from "./planet/planet.module";
import { CommissionModule } from "./commission/commission.module";
import { HttpModule } from "@nestjs/axios";
import { CartsModule } from "./carts/carts.module";
import { KycModule } from "./kyc/kyc.module";
import { ScheduleModule } from "@nestjs/schedule";
import { NotificationsModule } from "./notifications/notifications.module";
import { PaymentsModule } from "./payments/payments.module";
import { KeysModule } from "./keys/keys.module";
// import { DualAuthMiddleware } from './strategy/daap.jwt.strategy';
import { ClientController } from "./client/client.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validate,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Replace with your actual secret key
      signOptions: { expiresIn: CONSTANT.TOKEN_EXPIRY }, // Token expiration time
    }),
    ScheduleModule.forRoot(),
    HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
    S3UploadModule,
    AuthModule,
    UserModule,
    EventModule,
    StrainModule,
    NftModule,
    SaleModule,
    OrderModule,
    ClientModule,
    DashboardModule,
    MarketplaceModule,
    TransactionModule,
    PlanetModule,
    CommissionModule,
    CartsModule,
    KycModule,
    NotificationsModule,
    PaymentsModule,
    KeysModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    PrismaService,
    AuthRepository,
    EmailService,
    UtilsService,
  ],
})
export class AppModule {}
