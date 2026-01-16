
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsArray, IsUUID, IsPostalCode, IsPhoneNumber, IsEnum, IsNotEmpty, IsIn, IsInt, Min, Max, ValidateIf, validate, IsJSON, IsNumber } from 'class-validator';
import { PaginationDto } from 'src/constants/dto';

export class CreatePlanetDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    imageUrl?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsJSON()
    planetDetailJson?: any; 

}
export class UpdatePlanetDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    imageUrl?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsJSON()
    planetDetailJson?: any; 
}

export enum PlanetSearch {
    NAME = 'name',
}


export class GetAllPlanetDetailsDto extends PaginationDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional()
    @IsString()
    @ValidateIf(o => o.search)
    @IsEnum(PlanetSearch)
    searchBy: PlanetSearch;
}

export class planetNoDto{
    @ApiProperty()
    @Transform((v: any) => {
      return parseInt(v.value);
    })
    @IsNotEmpty()
    @IsNumber()
    planetNo: number;
}