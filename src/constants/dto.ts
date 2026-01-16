import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { Type } from "class-transformer";
import {
  IsEnum,
  IsOptional,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsDate,
  IsString,
} from "class-validator";

export interface NotificationData {
  userId: string;
  title: string;
  message: string;
  clientId: string;
  orderId: string;
  eventId: string;
}

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}

export class PaginationDto {
  @ApiProperty()
  @IsEnum(Prisma.SortOrder)
  @IsOptional()
  orderBy: Prisma.SortOrder = Prisma.SortOrder.asc;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}

export class filterByDate {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate({
    message: "startdate must be a valid date. ex: YYYY-MM-DD or MM-DD-YYYY",
  })
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate({
    message: "endDate must be a valid date. ex: YYYY-MM-DD or MM-DD-YYYY",
  })
  endDate: Date;
}

export class StrainIdParams {
  @IsString()
  @IsNotEmpty()
  strainId: string;

}
