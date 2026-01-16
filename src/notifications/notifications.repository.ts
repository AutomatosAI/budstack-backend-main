import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  NotificationStatus,
  PermissionType,
  Prisma,
  Role,
} from "@prisma/client";
import { NotificationData } from "src/constants/dto";

@Injectable()
export class NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async updateNotification(notificationId: string, status: NotificationStatus) {
    return await this.prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        status,
      },
    });
  }

  async getFcmTokens(
    orderId: string,
    clientId: string,
    title: string,
    message: string
  ): Promise<{ tokens: string[]; usersData: NotificationData[] }> {
    try {
      let permissionBy: PermissionType;
      if (orderId) permissionBy = PermissionType.SalesAndOrderTracking;
      if (clientId) permissionBy = PermissionType.ClientVerification;
      const tokenSet = new Set<string>();
      const userIds: string[] = [];

      // Fetch admins and subadmins with specific permissions
      const [admins, subAdminsWithPermission] = await this.prisma.$transaction([
        this.prisma.user.findMany({
          where: { role: Role.ADMIN, notification: true },
          select: { id: true, fcmTokens: { select: { token: true } } },
        }),
        this.prisma.user.findMany({
          where: {
            role: Role.SUBADMIN,
            userPermission: {
              some: { permission: permissionBy },
            },
            notification: true,
          },
          select: { id: true, fcmTokens: { select: { token: true } } },
        }),
      ]);

      // Helper function to extract tokens from results
      const extractTokens = (results: any[]) => {
        results.forEach((result) => {
          if (result.nft.owner && result.nft.owner.id) {
            userIds.push(result.nft.owner.id);
            result.nft.owner.fcmTokens.forEach((fcmToken) =>
              tokenSet.add(fcmToken.token)
            );
          }
          result.nft.associatedUsers.forEach((assocUser) => {
            if (assocUser.user && assocUser.user.id) {
              userIds.push(assocUser.user.id);
              assocUser.user.fcmTokens.forEach((fcmToken) =>
                tokenSet.add(fcmToken.token)
              );
            }
          });
        });
      };

      if (orderId) {
        // Fetch order owners and associated users' tokens
        const orderResult = await this.prisma.order.findMany({
          where: { id: orderId },
          select: {
            nft: {
              select: {
                owner: {
                  where: { notification: true },
                  select: { id: true, fcmTokens: { select: { token: true } } },
                },
                associatedUsers: {
                  where: { user: { notification: true } },
                  select: {
                    user: {
                      select: {
                        id: true,
                        fcmTokens: { select: { token: true } },
                      },
                    },
                  },
                },
              },
            },
          },
        });
        extractTokens(orderResult);
      }

      if (clientId) {
        const clientResult = await this.prisma.client.findMany({
          where: { id: clientId },
          select: {
            nft: {
              select: {
                owner: {
                  select: { id: true, fcmTokens: { select: { token: true } } },
                },
                associatedUsers: {
                  where: { user: { notification: true } },
                  select: {
                    user: {
                      select: {
                        id: true,
                        fcmTokens: { select: { token: true } },
                      },
                    },
                  },
                },
              },
            },
          },
        });
        extractTokens(clientResult);
      }

      // Extract tokens from admins
      admins.forEach((admin) => {
        if (admin.id) userIds.push(admin.id);
        admin.fcmTokens.forEach((fcmToken) => tokenSet.add(fcmToken.token));
      });

      // Extract tokens from subAdminsWithPermission if any, otherwise add only admin tokens
      if (subAdminsWithPermission.length > 0) {
        subAdminsWithPermission.forEach((subAdmin) => {
          if (subAdmin.id) userIds.push(subAdmin.id);
          subAdmin.fcmTokens.forEach((fcmToken) =>
            tokenSet.add(fcmToken.token)
          );
        });
      }

      const notifications: NotificationData[] = [];

      userIds.forEach((userId) => {
        notifications.push({
          userId: userId,
          title, // Replace with the actual title
          message, // Replace with the actual message
          clientId,
          orderId,
          eventId: undefined,
        });
      });

      return { tokens: Array.from(tokenSet), usersData: notifications };
    } catch (error) {
      throw error;
    }
  }

  async getFCMToken(userId: string, token: string) {
    return await this.prisma.fCMToken.findFirst({
      where: { userId, token },
    });
  }

  async setFcmToken(userId: string, token: string) {
    return await this.prisma.fCMToken.create({
      data: {
        token,
        user: { connect: { id: userId } },
      },
    });
  }

  async updateFcmToken(userId: string, token: string, newToken: string) {
    return await this.prisma.fCMToken.update({
      where: { userId, token },
      data: {
        token: newToken,
      },
    });
  }

  async createNotification(notifications: NotificationData[]) {
    return await this.prisma.notification.createMany({
      data: notifications,
    });
  }

  async removeFCMToken(userId: string, token: string) {
    try {
      return await this.prisma.fCMToken.delete({ where: { userId, token } });
    } catch (error) {
      throw error;
    }
  }

  async removeFCMTokens(fcmTokens: { userId: string; token: string }[]) {
    try {
      return await this.prisma.fCMToken.deleteMany({ where: {} });
    } catch (error) {
      throw error;
    }
  }

  async getAllNotifications(params: {
    where?: Prisma.NotificationWhereInput;
    select?: Prisma.NotificationSelect;
    skip?: number;
    take?: number;
    orderBy?: Prisma.NotificationOrderByWithAggregationInput;
  }) {
    try {
      const [notifications, count] = await this.prisma.$transaction([
        this.prisma.notification.findMany({ ...params }),
        this.prisma.notification.count({ where: params.where }),
      ]);
      return { notifications, paginationCount: count };
    } catch (error) {
      throw error;
    }
  }
}
