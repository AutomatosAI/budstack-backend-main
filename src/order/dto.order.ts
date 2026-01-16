import { ApiProperty } from "@nestjs/swagger";
import {
  AdminApprovalOnOrder,
  OrderStatus,
  PaymentStatus,
  Prisma,
} from "@prisma/client";
import { Transform, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
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

export enum OrderSearch {
  clientName = "clientName",
}

export class CreateOrderLineDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  strainId: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  pricePerUnit: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  clientId: string;
}

export class OrderIdsDto {
  @ApiProperty({
    description: "Array of order IDs",
    type: [String],
    example: [
      "e1234567-e89b-12d3-a456-426614174000",
      "e1234567-e89b-12d3-a456-426614174001",
    ],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID("all", { each: true, message: "Each orderId must be a valid UUID" })
  orderIds: string[];
}

export class OrderIdsQuery {
  @ApiProperty({
    description: "Array of order IDs",
    type: [String],
    example: [
      "e1234567-e89b-12d3-a456-426614174000",
      "e1234567-e89b-12d3-a456-426614174001",
    ],
  })
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => JSON.parse(value))
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID("all", { each: true, message: "Each orderId must be a valid UUID" })
  orderIds: string[];
}

export class OrdersApprovalDto extends OrderIdsDto {}

export class OrdersRejectionDto extends OrderIdsDto {
  @ApiProperty({
    description: "Rejection note for the orders",
    example: "order does not meet the requirements",
  })
  @IsNotEmpty()
  @IsString()
  rejectionNote: string;
}

export class OrderIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  orderId: string;
}

export class updateOrderStatusDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isApproved: boolean;

  @ApiProperty()
  @ValidateIf((o) => o.isApproved === false)
  @IsNotEmpty()
  @IsString()
  rejectionNote: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  @ApiProperty()
  @IsOptional()
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;
}

export class OrderStatusUpdate {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  orderId: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  @ApiProperty()
  @IsOptional()
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;
}

export class UpdateOrdersStatusDto {
  @ApiProperty({ type: [OrderStatusUpdate] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderStatusUpdate)
  orderUpdates: OrderStatusUpdate[];
}


export class UpdateOrderDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  unitPrice: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;
}

export class GetAllOrderDto extends PaginationDto {
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

  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) => JSON.parse(value))
  @IsOptional()
  clientIds?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty()
  @IsString()
  @ValidateIf((o) => o.search)
  @IsEnum(OrderSearch)
  @IsOptional()
  searchBy: OrderSearch;

  @ApiProperty()
  @IsEnum(OrderStatus)
  @IsOptional()
  status: OrderStatus;

  @ApiProperty()
  @IsEnum(PaymentStatus)
  @IsOptional()
  paymentStatus: PaymentStatus;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEnum(AdminApprovalOnOrder)
  adminApproval: AdminApprovalOnOrder;
}

export class filterByClientsDto extends filterByDate {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) => JSON.parse(value))
  @IsOptional()
  clientIds?: string[];
}
