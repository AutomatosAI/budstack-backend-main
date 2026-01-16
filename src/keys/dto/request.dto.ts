import { IntersectionType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PaginationDto, filterByDate } from "src/constants/dto";

export class KeyPair {
  apiKey: string;
  secretKey: string;
  message: string;
}

export class SoftDelete {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apiKeyId: string;
}

export class ApiKeyRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  keyName: string;
}

export class GetApiKeysQueryDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;
}
