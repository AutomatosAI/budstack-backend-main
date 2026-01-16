import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Prisma, SaleStage } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { PaginationDto, filterByDate } from "src/constants/dto";

export enum SaleSearch {
  clientName = "clientName",
}

export class createSaleDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  nftId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  clientId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  orderId: string;
}

export class SaleIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}

export class updateSaleDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEnum(SaleStage)
  stage: SaleStage;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}
export class getAllSaleDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty()
  @IsString()
  @ValidateIf((o) => o.search)
  @IsEnum(SaleSearch)
  searchBy: SaleSearch;

  @ApiProperty({ enum: SaleStage })
  @IsEnum(SaleStage)
  @IsOptional()
  stage: SaleStage;
}

export class filterByRevenueChartDto extends filterByDate {
  @IsArray()
  @Transform(({ value }) => {
    // Transform value to an array of integers
    const tokens = JSON.parse(value);
    return tokens.map((v: string) => parseInt(v, 10));
  })
  @IsOptional()
  tokenIds?: number[];

  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) => JSON.parse(value))
  @IsOptional()
  countryCodes?: string[];

  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) => JSON.parse(value))
  @IsOptional()
  clientIds?: string[];
}

export class GetAllStrainsRevenueDto extends PaginationDto {
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

  @IsArray()
  @Transform(({ value }) => {
    // Transform value to an array of integers
    const tokens = JSON.parse(value);
    return tokens.map((v: string) => parseInt(v, 10));
  })
  @IsOptional()
  tokenIds?: number[];

  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) => JSON.parse(value))
  @IsOptional()
  countryCodes?: string[];

  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) => JSON.parse(value))
  @IsOptional()
  clientIds?: string[];
}
