import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail, IsPhoneNumber, IsNotEmpty } from "class-validator";
import { IsLowercaseEmail } from "src/validators/email.validator";

export class CreateIndividualCaseDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @IsLowercaseEmail({ message: "Email must be in lowercase." })
    email: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;
  }