import { ApiProperty } from "@nestjs/swagger";
import { AdminApprovalOnClient, PaymentStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateIf, IsNotEmpty, IsEnum, IsDate, IsBoolean } from "class-validator";
import { PaginationDto } from "src/constants/dto";
import { OrderIdsDto } from "src/order/dto.order";
import { STATUS } from "src/user/user.dto";

export enum CommissionSearch {
    clientName = 'clientName',
  }

export class CommissionStatusDto extends OrderIdsDto {
  "c1d3daa7-d542-4fe3-8bc6-1a4e34a13608"
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isPaid: boolean;

  @ApiProperty()
  @ValidateIf((o) => o.isPaid == true)
  @IsOptional()
  @IsString()
  transactionHash: string;
}

export class GetAllCommissionDto extends PaginationDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    search: string;
  
    @ApiProperty()
    @ValidateIf(o => o.search)
    @IsString()
    @IsNotEmpty()
    @IsEnum(CommissionSearch)
    searchBy: CommissionSearch;

    @ApiProperty()
    @IsOptional()
    @IsEnum(PaymentStatus)
    paymentStatus: PaymentStatus;
  }

  export class GetAllAgentCommissionDto extends PaginationDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    search: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(STATUS)
    agentStatus: STATUS;
  }