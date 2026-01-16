import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsEthereumAddress,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { MESSAGES } from "src/constants";
import { TOKEN_TYPE } from "src/utils/utils.dto";
import { IsLowercaseEmail } from "src/validators/email.validator";

export class WalletDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEthereumAddress({ message: "Please provide a valid Ethereum address." })
  @IsString()
  @Transform((v: any) => v.value.toLowerCase())
  walletAddress: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsOptional()
  @IsLowercaseEmail({ message: "Email must be in lowercase." })
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  type: string;
}

export class SignInDto {
  @ApiProperty()
  @IsString()
  @IsEthereumAddress({ message: 'Please provide a valid Ethereum address.' })
  @IsNotEmpty()
  @Transform((v: any) => v.value.toLowerCase())
  walletAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  signature: string;
}
export class EmailTypeDto {
  @ApiProperty()
  @IsEnum([TOKEN_TYPE.EMAIL_VERIFICATION, TOKEN_TYPE.TWO_STEP_VERIFICATION], { message: MESSAGES.ERROR.EMAIL_TYPE})
  @IsOptional()
  type: TOKEN_TYPE = TOKEN_TYPE.EMAIL_VERIFICATION;
}

export class VerifyEmailDto extends EmailTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;
}

export class UpdateUserFromAdminDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    id: string;
}

export class CreateSubAdminFromAdminDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsLowercaseEmail({ message: "Email must be in lowercase." })
  email: string;
}
