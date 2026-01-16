import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/constants/dto";

export class DeleteCartQueryDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cartId: string
}

export class GetCartsDto extends PaginationDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    search: string
}