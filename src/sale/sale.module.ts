import { Module } from "@nestjs/common";
import { SaleService } from "./sale.service";
import { SaleController } from "./sale.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { SaleRepository } from "./sale.repository";
import { UtilsService } from "src/utils/utils.service";
import { JwtService } from "@nestjs/jwt";
import { EmailService } from "src/email/email.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule.register({ timeout: 5000, maxRedirects: 5 })],
  controllers: [SaleController],
  providers: [
    SaleService,
    PrismaService,
    SaleRepository,
    UtilsService,
    JwtService,
    EmailService
  ],
})
export class SaleModule {}
