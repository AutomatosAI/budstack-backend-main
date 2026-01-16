import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsEthereumAddress,
  IsHexadecimal,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Max,
  Min,
  ValidateIf,
} from "class-validator";
import { MESSAGES } from "src/constants";
import { PaginationDto } from "src/constants/dto";

export class createNftDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tokenId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsUrl()
  metaDataUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEthereumAddress({ message: "Please provide a valid Ethereum address." })
  @IsString()
  @Transform((v: any) => v.value.toLowerCase())
  walletAddress: string;
}

export class NftIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}

export class updateNftDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  ownerId: string;
}

export enum NftSearch {
  NFT_NAME = "nftName",
}

export class getNftDto extends PaginationDto {
  @ApiProperty()
  @Transform((v: any) => {
    return parseInt(v.value);
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  isListedForSale: number = null;
}

export enum OrderFrom {
  DATE = "date",
  PRICE = "price",
}

export class getAllNftDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty()
  @ValidateIf((o) => o.search)
  @IsString()
  @IsNotEmpty()
  @IsEnum(NftSearch)
  searchBy: NftSearch;

  @ApiProperty()
  @Transform((v: any) => {
    return v.value.split(",").map((val) => parseInt(val));
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true, message: MESSAGES.ERROR.NUM_ARRAY })
  planetNo: number[] = [];

  @ApiProperty()
  @Transform((v: any) => {
    return parseInt(v.value);
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  isListedForSale: number = null;

  @ApiProperty()
  @IsOptional()
  @IsEnum(OrderFrom)
  orderFrom: OrderFrom = OrderFrom.DATE;
}

export class getNftByIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}

export class getNftByTokenDto {
  @ApiProperty()
  @Transform((v: any) => {
    return parseInt(v.value);
  })
  @IsNotEmpty()
  @IsNumber()
  tokenId: number;
}

export class SaleNftDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  tokenId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  salePrice: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsHexadecimal()
  signature: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  timestamp: string;
}

export class UpdateNftSaleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  tokenId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsHexadecimal()
  signature: string;
}

export class GetUsersQueryDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  search: string;
}

export class GetAllNftsQueryDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  search: string;

  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) => JSON.parse(value))
  @IsOptional()
  celebrityIds?: string[];
}
