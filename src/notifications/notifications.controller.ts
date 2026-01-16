import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import {
  FcmToken,
  GetAllNotificationDto,
  NotificationParamDto,
  UpdateNotification,
  notificationDto,
} from "./dto/request.dto";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard("jwt"))
@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // @Post()
  // async sendNotification(@Body() body: notificationDto): Promise<string> {
  //   return await this.notificationsService.sendUserNotification(body);
  // }

  // @Post("topic")
  // async sendNotificationToTopic(@Body() body: { topic: string }): Promise<any> {
  //   return await this.notificationsService.sendNotificationToTopic(
  //     body.topic,
  //     "Event",
  //     "Event has been added"
  //   );
  // }

  // @Post("subscribe")
  // async subscribe(
  //   @Body() body: { oldToken: string; token: string; topic: string }
  // ) {
  //   // Unsubscribe old tokens for the user from the topic (if needed)
  //   // await this.notificationsService.unsubscribeFromTopic(body.oldToken, body.topic);

  //   // Subscribe new token to the topic
  //   return this.notificationsService.subscribeToTopic(body.token, body.topic);
  // }

  // @Post("unsubscribe")
  // async unsubscribe(@Body() body: { token: string; topic: string }) {
  //   return this.notificationsService.unsubscribeFromTopic(
  //     body.token,
  //     body.topic
  //   );
  // }

  @Get()
  async getAllNotifications(@Req() req, @Query() query: GetAllNotificationDto) {
    return await this.notificationsService.getAllNotifications(req, query);
  }

  @Post("/fcm")
  async checkToken(@Body() body: FcmToken, @Req() req) {
    return await this.notificationsService.checkFcmToken(req.user.id, body);
  }

  @Patch("/:notificationId")
  async updateNotification(
    @Param() param: NotificationParamDto,
    @Body() dto: UpdateNotification
  ) {
    return await this.notificationsService.updateNotification(
      param.notificationId,
      dto.status
    );
  }
}
