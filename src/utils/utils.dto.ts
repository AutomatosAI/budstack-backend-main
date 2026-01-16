import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";


export enum TOKEN_TYPE {
    LOGIN = 'LOGIN',
    EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
    TWO_STEP_VERIFICATION = 'TWO_STEP_VERIFICATION'
}

export class CreateTokenDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(TOKEN_TYPE)
    tokenType: TOKEN_TYPE;
  }
