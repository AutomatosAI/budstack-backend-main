import { Module } from "@nestjs/common";
import { CommissionService } from "./commission.service";
import { CommissionController } from "./commission.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { CommissionRepository } from "./commission.repository";
import { UtilsService } from "src/utils/utils.service";
import { JwtService } from "@nestjs/jwt";
import { EmailService } from "src/email/email.service";
import { JwtStrategy } from "src/strategy/jwt.strategy";
import { HttpModule } from "@nestjs/axios";
import { AuthRepository } from "src/auth/auth.repository";
import { UserRepository } from "src/user/user.repository";
import { NftRepository } from "src/nft/nft.repository";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [
    HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
    CacheModule.register({ ttl: 82800000 }),
  ],
  controllers: [CommissionController],
  providers: [
    CommissionService,
    CommissionRepository,
    PrismaService,
    UtilsService,
    JwtStrategy,
    JwtService,
    EmailService,
    AuthRepository,
    UserRepository,
    NftRepository,
  ],
})
export class CommissionModule {}
