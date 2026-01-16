import { ApiProperty } from "@nestjs/swagger";
import { StrainType } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsISO31661Alpha3,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from "class-validator";
import { PaginationDto } from "src/constants/dto";

export enum StrainSearch {
  NAME = "name",
}

class LocationsData {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  locationId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stockQuantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isAvailable: boolean;
}

export class CreateStrainDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsEnum(StrainType)
  @IsNotEmpty()
  type: StrainType; // if 'type' is going to be an enum, adjust

  @ApiProperty({ required: true })
  @IsArray()
  @IsNotEmpty()
  @Type(() => LocationsData)
  locations: LocationsData[];

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  isAvailable: boolean;

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  thc: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cbg: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cbd: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  batchNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  strainId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  flavour?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  feelings?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  effects?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  helpsWith?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  popularity?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty()
  @IsInt({ each: true })
  @IsArray()
  @IsNotEmpty()
  planetDetailIds: number[];

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  wholeSalePrice: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  retailPrice: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  stockQuantity: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  discount: number;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  expiryDate?: Date;
}

export class UpdateStrainDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(StrainType)
  type?: StrainType;

  @ApiProperty({ required: true })
  @IsArray()
  @IsOptional()
  @Type(() => LocationsData)
  locations?: LocationsData[];

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  flavour?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  feelings?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  effects?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  helpsWith?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  thc?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  cbg?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  cbd?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  batchNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  popularity?: number;

  @ApiProperty()
  @IsInt({ each: true })
  @IsArray()
  @IsOptional()
  planetDetailIds?: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  wholeSalePrice?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  retailPrice?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  stockQuantity?: number;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  expiryDate?: Date;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export enum ThcLevel {
  NONE = "None",
  LOW = "Low",
  MID = "Mid",
  HIGH = "High",
}

// Map THC levels to numeric ranges
export const THC_RANGES = {
  [ThcLevel.NONE]: { min: 0, max: 0 }, // THC None
  [ThcLevel.LOW]: { min: 1, max: 10 }, // THC Low
  [ThcLevel.MID]: { min: 11, max: 20 }, // THC Mid
  [ThcLevel.HIGH]: { min: 21, max: 29 }, // THC High
};

export enum StrainOrderBy {
  CREATED_AT = "createdAt",
  POPULARITY = "popularity",
}

export class getAllStrainDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(StrainOrderBy)
  order: StrainOrderBy = StrainOrderBy.CREATED_AT;

  @ApiProperty()
  @IsOptional()
  @IsISO31661Alpha3()
  @IsString()
  countryCode: string;

  @IsOptional()
  @IsEnum(ThcLevel, { each: true }) // Validate each item in the array
  @Transform(({ value }) => (value ? JSON.parse(value) : undefined))
  thcLevels?: ThcLevel[]; // THC level filter (None, Low, Mid, High)

  @IsOptional()
  @Transform(({ value }) => (value ? JSON.parse(value) : undefined))
  feelings?: string[]; // Filter by feelings

  @IsOptional()
  @Transform(({ value }) => (value ? JSON.parse(value) : undefined))
  helpsWith?: string[]; // Filter by helpsWith

  @IsOptional()
  @Transform(({ value }) => (value ? JSON.parse(value) : undefined))
  planetNames?: string[]; // Filter by planet name
}

export class CartDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  strainId: string;

  @ApiProperty()
  @IsNotEmpty()
  @Min(0.001)
  @IsNumber({ maxDecimalPlaces: 3 })
  quantity: number;
}

export class CreateCartItemsDto {
  @ApiProperty({ type: [CartDto] })
  @Type(() => CartDto)
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  items: CartDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  clientCartId: string;
}
