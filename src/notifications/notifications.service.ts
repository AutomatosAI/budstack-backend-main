import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as admin from "firebase-admin";
import { NotificationsRepository } from "./notifications.repository";
import {
  FcmToken,
  GetAllNotificationDto,
  notificationDto,
} from "./dto/request.dto";
import { CONSTANT, MESSAGES } from "src/constants";
import { NotificationStatus, Prisma } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import { configData } from "src/config";
import { UserRepository } from "src/user/user.repository";
import { NotificationData } from "src/constants/dto";

@Injectable()
export class NotificationsService {
  constructor(
    // private prismaService: PrismaService,
    private notificationRepository: NotificationsRepository,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService
  ) {}

  config: any = configData(this.configService);

  async sendUserNotification(body: notificationDto): Promise<string> {
    const { userId, title, message, clientId, orderId, eventId } = body;
    let notifications: NotificationData[];
    try {
      if (clientId || orderId) {
        const { tokens, usersData } =
          await this.notificationRepository.getFcmTokens(
            orderId,
            clientId,
            title,
            message
          );
        notifications = usersData;
        // Send FCM notification
        const data = admin.messaging().sendEachForMulticast({
          tokens, // Users' FCM tokens
          data: {
            title: title,
            body: message,
            image: this.config.FIREBASE_NOTIFICATION_IMAGE_URL,
          },
        });
      } else if (eventId) {
        await this.sendNotificationToTopic(
          CONSTANT.FIREBASE.NOTIFICATION.EVENT_TOPIC,
          title,
          message
        );
      }
      
      // Save notification to the database
      await this.notificationRepository.createNotification(notifications);

      return "Notification sent successfully";
    } catch (error) {
      // Save notification to the database in case of an error
      await this.notificationRepository.createNotification(notifications);
      console.error("Error in sendUserNotification:", error);
      return `Error: ${error.message}`;
    }
  }

  async sendNotificationToTopic(topic: string, title: string, body: string) {
    const response = await admin.messaging().sendToTopic(topic, {
      data: {
        title,
        body,
        image: this.config.FIREBASE_NOTIFICATION_IMAGE_URL,
      },
    });
    return response;
  }

  async subscribeToTopic(token: string, topic: string) {
    const response = await admin.messaging().subscribeToTopic(token, topic);
    return response;
  }

  async unsubscribeFromTopic(token: string, topic: string) {
    const response = await admin.messaging().unsubscribeFromTopic(token, topic);
    return response;
  }

  async checkFcmToken(userId: string, body: FcmToken): Promise<any> {
    try {
      const { oldFcmToken, newFcmToken } = body;
      const holder = await this.userRepository.getUserDetails({ id: userId });
      if (!holder) throw new NotFoundException(MESSAGES.ERROR.USERS.NOT_FOUND);

      let token;
      if (newFcmToken) {
        if (newFcmToken === oldFcmToken) {
          token = await this.handleMatchingTokens(userId, newFcmToken);
        } else {
          await this.unsubscribeFromTopic(
            oldFcmToken,
            CONSTANT.FIREBASE.NOTIFICATION.EVENT_TOPIC
          );
          token = await this.handleDifferentTokens(
            userId,
            oldFcmToken,
            newFcmToken
          );
        }
        await this.subscribeToTopic(
          newFcmToken,
          CONSTANT.FIREBASE.NOTIFICATION.EVENT_TOPIC
        );
      } else {
        await this.unsubscribeFromTopic(
          oldFcmToken,
          CONSTANT.FIREBASE.NOTIFICATION.EVENT_TOPIC
        );
        token = await this.removeOldToken(userId, oldFcmToken);
      }
      return token;
    } catch (error) {
      throw error;
    }
  }

  private async handleMatchingTokens(
    userId: string,
    newFcmToken: string
  ): Promise<any> {
    let token = await this.notificationRepository.getFCMToken(
      userId,
      newFcmToken
    );
    if (!token) {
      token = await this.notificationRepository.setFcmToken(
        userId,
        newFcmToken
      );
    }
    return token;
  }

  private async handleDifferentTokens(
    userId: string,
    oldFcmToken: string,
    newFcmToken: string
  ): Promise<any> {
    let token = await this.notificationRepository.getFCMToken(
      userId,
      oldFcmToken
    );
    if (token) {
      token = await this.notificationRepository.updateFcmToken(
        userId,
        oldFcmToken,
        newFcmToken
      );
    }
    return token;
  }

  private async removeOldToken(
    userId: string,
    oldFcmToken: string
  ): Promise<any> {
    let token = await this.notificationRepository.getFCMToken(
      userId,
      oldFcmToken
    );
    if (token) {
      await this.notificationRepository.removeFCMToken(userId, oldFcmToken);
    }
    return MESSAGES.SUCCESS.DEFAULT;
  }

  async getAllNotifications(req, query: GetAllNotificationDto) {
    try {
      const { id, role } = req.user;
      const { startDate, endDate, search, skip, take, orderBy } = query;
      const user = await this.userRepository.getUserDetails({
        id,
      });
      if (!user) {
        throw new BadRequestException(MESSAGES.ERROR.USERS.NOT_FOUND);
      }
      const where: Prisma.NotificationWhereInput = {
        userId: user.id,
      };
      if (search) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { message: { contains: search, mode: "insensitive" } },
        ];
      }

      if (startDate && endDate) {
        endDate.setDate(endDate.getDate() + 1);
        where.createdAt = {
          gte: startDate,
          lte: endDate,
        };
      }

      const notificationData =
        await this.notificationRepository.getAllNotifications({
          where,
          select: {
            id: true,
            title: true,
            message: true,
            status: true,
            createdAt: true,
          },
          orderBy: { createdAt: orderBy },
          skip: skip,
          take: take,
        });
      return notificationData;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateNotification(notificationId: string, status: NotificationStatus) {
    try {
      return await this.notificationRepository.updateNotification(
        notificationId,
        status
      );
    } catch (error) {
      throw error;
    }
  }
}
