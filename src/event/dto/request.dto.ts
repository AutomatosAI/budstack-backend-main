import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { EventType } from "@prisma/client";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Matches,
  ValidateIf,
} from "class-validator";
import { MESSAGES } from "src/constants";
import { PaginationDto } from "src/constants/dto";
import { STATUS } from "src/user/user.dto";

export enum EventSearch {
  TITLE = "title",
}

export enum EventParamType {
  LIVE = "live",
  UPCOMING = "upcoming",
  COMPLETED = "completed"
}

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsEnum(EventType)
  @IsNotEmpty()
  eventType: EventType;

  @ApiProperty()
  @IsString({
    each: true,
  })
  @IsOptional()
  @IsArray()
  @Matches(/^https:\/\/[a-z0-9.-]+\.s3\.amazonaws\.com(\/[^/]+\/?)?$/, {
    message: MESSAGES.ERROR.INVALID_S3_URL,
    each: true,
  })
  eventImageUrl: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  startTime?: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  endTime?: string;

  @ApiProperty()
  @ValidateIf(o => o.eventType === EventType.Physical)
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  ctaText?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  ctaUrl?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  organizedBy?: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

}

export class EventIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}

export class UpdateEventDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsEnum(EventType)
  @IsNotEmpty()
  eventType: EventType;

  @ApiProperty()
  @IsString({
    each: true,
  })
  @IsOptional()
  @IsArray()
  @Matches(/^https:\/\/[a-z0-9.-]+\.s3\.amazonaws\.com(\/[^/]+\/?)?$/, {
    message: MESSAGES.ERROR.INVALID_S3_URL,
    each: true,
  })
  eventImageUrl: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  startTime?: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  endTime?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ctaText?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  ctaUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  organizedBy?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}

export class EventTypeParams{
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(EventParamType)
  eventType: EventParamType;
}

export class GetAllEventDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(STATUS)
  status: STATUS;
}
