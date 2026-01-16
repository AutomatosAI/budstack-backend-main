import { ApiProperty } from "@nestjs/swagger";
import { TransactionStatus, TransactionType } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/constants/dto";

export class GetAllTransactionDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;
  }


  export class GetAllTransactionByClientDto {
    @ApiProperty()
    @IsOptional()
    @IsEnum(TransactionStatus)
    status: TransactionStatus;
  
    @ApiProperty()
    @IsOptional()
    @IsEnum(TransactionType)
    method: TransactionType;
  }