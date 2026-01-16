import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUrl, Min, IsPositive, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCryptoInvoiceDto {
  @ApiProperty({ description: 'Invoice amount' })
  // @IsNumber()
  @IsString()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ description: 'Payer name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Currency code, e.g., USD' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  currency: string;

  @ApiProperty({ description: 'Invoice expiration time in minutes' })
  // @IsNumber()
  @IsString()
  @IsNotEmpty()
  expire_time: number;

  @ApiProperty({ description: 'URL to receive notifications' })
  @IsUrl()
  @IsNotEmpty()
  notify_url: string;

  @ApiProperty({ description: 'URL to redirect to upon successful payment' })
  @IsUrl()
  @IsNotEmpty()
  success_url: string;

  @ApiProperty({ description: 'URL to redirect to upon payment failure' })
  @IsUrl()
  @IsNotEmpty()
  fail_url: string;

  @ApiProperty({ description: 'Description of the invoice', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  // @ApiProperty({ description: 'Custom data field 1', required: false })
  // @IsString()
  // @IsOptional()
  // custom_data1?: string;

  // @ApiProperty({ description: 'Custom data field 2', required: false })
  // @IsString()
  // @IsOptional()
  // custom_data2?: string;
}

export class OrderInvoiceDto {
  @ApiProperty({ description: 'Client Email' })
  @IsString()
  @IsNotEmpty()
  clientEmail: string;

  @ApiProperty({ description: 'Order ID' })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ description: 'Order ID' })
  @IsNumber()
  @IsNotEmpty()
  orderAmount: number;
}
