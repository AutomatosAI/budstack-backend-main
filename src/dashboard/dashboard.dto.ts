import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsDateString, IsEnum, IsString } from "class-validator";

export enum filterBy {
    CLIENT = 'Client',
    ORDER = 'Order',
    PROFIT = 'Profit',
}

export class AnalyticsDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    startDate: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    endDate: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEnum(filterBy)
    filterBy: filterBy;
  }