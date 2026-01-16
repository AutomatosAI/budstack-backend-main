import { ApiProperty } from "@nestjs/swagger";
import { NftTransactionType } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsInt, IsOptional, IsEnum, IsString, ValidateIf, IsEthereumAddress } from "class-validator";
import { PaginationDto } from "src/constants/dto";

export enum TransactionSearch {
  NFT_NAME = 'nftName',
}

export class GetAllTransactionDto extends PaginationDto {
    @ApiProperty()
    @Transform((v: any) => {
        return parseInt(v.value);
      })
    @IsNotEmpty()
    @IsInt()
    @IsOptional()
    tokenId: number;

    @ApiProperty({enum:NftTransactionType})
    @IsEnum(NftTransactionType)
    @IsOptional()
    @IsNotEmpty()
    type: NftTransactionType;

    @ApiProperty()
    @IsOptional()
    @IsString()
    search: string;
  
    @ApiProperty()
    @ValidateIf(o => o.search)
    @IsString()
    @IsNotEmpty()
    @IsEnum(TransactionSearch)
    searchBy: TransactionSearch;
  }

  export class GetWhiteListedDto {
    @ApiProperty()
    @IsString()
    @IsEthereumAddress({ message: 'Please provide a valid Ethereum address.' })
    @IsNotEmpty()
    @Transform((v: any) => v.value.toLowerCase())
    walletAddress: string;
  }