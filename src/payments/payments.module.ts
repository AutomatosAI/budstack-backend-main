import { Module } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { PaymentsRepository } from "./payments.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { HttpModule } from "@nestjs/axios";
import { EmailService } from "src/email/email.service";
import { OrderRepository } from "src/order/order.repository";
import { UtilsService } from "src/utils/utils.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [HttpModule.register({ timeout: 10000, maxRedirects: 5 })],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    PaymentsRepository,
    PrismaService,
    EmailService,
    OrderRepository,
    UtilsService,
    JwtService
  ],
})
export class PaymentsModule {}
