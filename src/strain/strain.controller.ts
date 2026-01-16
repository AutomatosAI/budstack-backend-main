import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  Patch,
} from "@nestjs/common";
import { StrainService } from "./strain.service";
import { CreateStrainDto } from "./dto";
import {
  UpdateStrainDto,
  CreateCartItemsDto,
  getAllStrainDto,
} from "./dto/request.dto";
import { AuthGuard } from "@nestjs/passport";
import { RoleGuard } from "src/guard/roles.guard";
import { Role } from "@prisma/client";
import { StrainIdParams } from "src/constants/dto";
import { DualAuthGuard } from "src/strategy/daap.jwt.strategy";

@Controller("")
export class StrainController {
  constructor(private readonly strainService: StrainService) {}

  @Get("locations")
  async getAllLocations() {
    return await this.strainService.getAllLocations();
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Post("strains")
  async createStrain(@Body() body: CreateStrainDto) {
    return this.strainService.create(body);
  }

  // @UseGuards(AuthGuard("jwt"))
  @Get("strains")
  async getAllStrains(@Query() query: getAllStrainDto) {
    return this.strainService.getAllStrains(query, false);
  }

  @UseGuards(DualAuthGuard)
  @Get("dapp/strains")
  async getAllStrainsByCountry(@Query() query: getAllStrainDto) {
    return this.strainService.getAllStrains(query, true);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Patch("strains/:strainId")
  async updateStrainById(
    @Param() param: StrainIdParams,
    @Body() body: UpdateStrainDto
  ) {
    return await this.strainService.updateStrainById(param.strainId, body);
  }

  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Patch("strains/:strainId/remove")
  async removeStrainById(@Param() param: StrainIdParams) {
    return await this.strainService.removeStrainById(param.strainId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("strains/:strainId")
  async getStrainsById(
    @Param() params: StrainIdParams,
    @Query("countryCode") countryCode: string
  ) {
    return this.strainService.getStrainById(params, countryCode);
  }

  @UseGuards(DualAuthGuard)
  @Get("dapp/strains/:strainId")
  async getDappStrainById(
    @Param() params: StrainIdParams,
    @Query("countryCode") countryCode: string
  ) {
    return this.strainService.getStrainById(params, countryCode);
  }
}
