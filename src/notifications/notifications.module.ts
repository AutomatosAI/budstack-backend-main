import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { NotificationsController } from "./notifications.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { NotificationsRepository } from "./notifications.repository";
import { UserRepository } from "src/user/user.repository";

@Module({
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    PrismaService,
    NotificationsRepository,
    UserRepository,
  ],
})
export class NotificationsModule {}
