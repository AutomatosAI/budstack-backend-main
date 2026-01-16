import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsEthereumAddress,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
  NotContains,
  Validate,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { MESSAGES } from "src/constants";
import { NftType, PermissionType, Role, User } from "@prisma/client";
import { PaginationDto } from "src/constants/dto";
import { UniqueNftType } from "src/validators/whitelisted_users.validator";
import { IsLowercaseEmail } from "src/validators/email.validator";

export enum UserType {
  NFTHOLDER = "nftHolder",
  MANAGER = "manager",
  SUBADMIN = "subAdmin",
  WHITELISTED = "whitelisted",
}

export enum STATUS {
  ACTIVE = "Active",
  INACTIVE = "InActive",
}

export class UserParamsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class PermissionDto {
  @IsOptional()
  @IsEnum(PermissionType, { each: true })
  permission?: PermissionType;

  @IsOptional()
  @IsBoolean()
  read?: boolean;

  @IsOptional()
  @IsBoolean()
  write?: boolean;
}

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsEthereumAddress({ message: "Please provide a valid Ethereum address." })
  @IsNotEmpty()
  @Transform((v: any) => v.value.toLowerCase())
  walletAddress: string;

  @ApiProperty()
  @IsString()
  @IsEthereumAddress({ message: "Please provide a valid Ethereum address." })
  @IsNotEmpty()
  @Transform((v: any) => v.value.toLowerCase())
  signerWalletAddress: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsLowercaseEmail({ message: "Email must be in lowercase." })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phoneCountryCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phoneCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsEnum([Role.ADMIN, Role.SUBADMIN, Role.MANAGER])
  @IsNotEmpty()
  userRole: Role;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  nftIds: number[];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  commissionPercent: number;

  @ValidateIf((obj) => obj.role === Role.SUBADMIN)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionDto)
  permissions?: PermissionDto[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  signature: string;
}

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @ValidateIf((o) => o.phoneNumber)
  @IsOptional()
  @IsString()
  phoneCountryCode: string;

  @ApiProperty({ required: false })
  @ValidateIf((o) => o.phoneNumber)
  @IsOptional()
  @IsString()
  phoneCode?: string;

  @ApiProperty({ required: false })
  @IsEnum(Role)
  @IsOptional()
  userRole?: Role;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  nftIds?: number[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @ValidateIf((obj) => obj.nftIds != undefined)
  @Transform((v: any) => v.value.toLowerCase())
  signerWalletAddress?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  commissionPercent?: number;

  @ApiProperty({ required: false })
  @ValidateIf((obj) => obj.userRole === Role.SUBADMIN)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionDto)
  @IsOptional()
  permissions?: PermissionDto[];

  @ApiProperty({ required: false })
  @IsString()
  @ValidateIf((obj) => obj.nftIds != undefined)
  @IsOptional()
  signature?: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}

export class CreateWhitelistUsersDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEthereumAddress({ message: "Please provide a valid Ethereum address." })
  @IsString()
  @Transform((v: any) => v.value.toLowerCase())
  walletAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => NftLimit)
  @ArrayMinSize(1, { message: "KEY limits cannot be empty" })
  @UniqueNftType({
    message: "Each keyType in keyLimits must be unique",
  })
  nftLimits: NftLimit[];
}

export class NftLimit {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(NftType)
  nftType: NftType;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  nftLimit: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  signature: string;
}

export class RemoveWhitelistedUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEthereumAddress({ message: "Please provide a valid Ethereum address." })
  @IsString()
  @Transform((v: any) => v.value.toLowerCase())
  walletAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  nftTypes: NftType[];
}

export class updateProfileDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsOptional()
  @IsLowercaseEmail({ message: "Email must be in lowercase." })
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @Length(4, 16)
  @NotContains(" ", { message: MESSAGES.ERROR.USERS.NO_SPACE })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: MESSAGES.ERROR.USERS.INVALID_USERNAME,
  })
  username: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Matches(/^https:\/\/[a-z0-9.-]+\.s3\.amazonaws\.com(\/[^/]+\/?)?$/, {
    message: MESSAGES.ERROR.INVALID_S3_URL,
  })
  profileUrl: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bio: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  enable2fa: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  notification: Boolean;
}

export class UpdateUserStatusDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}

export class checkUsernameDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @Length(4, 16)
  @NotContains(" ", { message: MESSAGES.ERROR.USERS.NO_SPACE })
  username: string;
}

export class checkUserEmailDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsLowercaseEmail({ message: "Email must be in lowercase." })
  email: string;
}

export class getAllUsersDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(UserType)
  userType: UserType;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  tokenId: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(STATUS)
  byStatus: STATUS;

  @ApiProperty()
  @IsOptional()
  @IsEnum(STATUS)
  agentStatus: STATUS;
}

export class QueryParamsDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;
}

export class UpdatePrimaryNftDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  tokenId: number;
}
