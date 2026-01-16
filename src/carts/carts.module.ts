import { Module } from "@nestjs/common";
import { CartsService } from "./carts.service";
import { CartsController } from "./carts.controller";
import { CartsRepository } from "./carts.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [CartsController],
  providers: [CartsService, CartsRepository, PrismaService, JwtService],
})
export class CartsModule {}
