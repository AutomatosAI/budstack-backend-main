import { Module } from "@nestjs/common";
import { KycService } from "./kyc.service";
import { CacheModule } from "@nestjs/cache-manager";
import { KycController } from "./kyc.controller";
import { HttpModule } from "@nestjs/axios";
import { EmailService } from "src/email/email.service";
import { KycRepository } from "./kyc.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { ClientRepository } from "src/client/client.repository";
import { UtilsService } from "src/utils/utils.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    HttpModule.register({ timeout: 10000, maxRedirects: 5 }),
    CacheModule.register({ ttl: 82800000 }),
  ],
  controllers: [KycController],
  providers: [
    KycService,
    EmailService,
    KycRepository,
    PrismaService,
    ClientRepository,
    UtilsService,
    JwtService
  ],
})
export class KycModule {}
