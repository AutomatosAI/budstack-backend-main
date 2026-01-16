import { Module } from "@nestjs/common";
import { MarketplaceService } from "./marketplace.service";
import { MarketplaceController } from "./marketplace.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { MarketPlaceRepository } from "./marketplace.repository";
import { NftService } from "src/nft/nft.service";
import { NftModule } from "src/nft/nft.module";
import { AuthRepository } from "src/auth/auth.repository";
import { PlanetRepository } from "src/planet/planet.repository";
import { UserRepository } from "src/user/user.repository";
import { CommissionRepository } from "src/commission/commission.repository";
import { CommissionService } from "src/commission/commission.service";
import { UtilsService } from "src/utils/utils.service";
import { JwtService } from "@nestjs/jwt";
import { EmailService } from "src/email/email.service";
import { HttpModule } from "@nestjs/axios";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [
    NftModule,
    HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
    CacheModule.register({ ttl: 82800000 }),
  ],
  controllers: [MarketplaceController],
  providers: [
    MarketplaceService,
    PrismaService,
    MarketPlaceRepository,
    NftService,
    AuthRepository,
    PlanetRepository,
    UserRepository,
    CommissionService,
    CommissionRepository,
    UtilsService,
    JwtService,
    EmailService,
  ],
})
export class MarketplaceModule {}
