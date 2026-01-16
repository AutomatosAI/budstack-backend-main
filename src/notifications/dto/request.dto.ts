import { ApiProperty } from "@nestjs/swagger";
import { NotificationStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/constants/dto";

export class notificationDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  userId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  clientId!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  orderId!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  eventId!: string;
}

export class UpdateNotification {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(NotificationStatus)
  status: NotificationStatus;
}

export class NotificationParamDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  notificationId: string;
}

export class FcmToken {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  oldFcmToken: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  newFcmToken: string;
}

export class GetAllNotificationDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @IsDate({
    message: "startdate must be a valid date. ex: YYYY-MM-DD or MM-DD-YYYY",
  })
  startDate: Date;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @IsDate({
    message: "endDate must be a valid date. ex: YYYY-MM-DD or MM-DD-YYYY",
  })
  endDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;
}
