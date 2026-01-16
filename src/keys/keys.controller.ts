import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ApiKeyRequestDto, SoftDelete } from "./dto";
import { AuthGuard } from "@nestjs/passport";
import { RoleGuard } from "src/guard/roles.guard";
import { Role } from "@prisma/client";
import { KeysService } from "./keys.service";
import { GetApiKeysQueryDto } from "./dto/request.dto";

@UseGuards(AuthGuard("jwt"), new RoleGuard([Role.USER]))
@Controller("keys")
export class KeysController {
  constructor(private keysService: KeysService) {}

  @Post("")
  async genKeys(@Body() body: ApiKeyRequestDto, @Req() req) {
    return await this.keysService.genKeys(req.user.id, body.keyName);
  }

  @ApiOkResponse()
  @ApiBadRequestResponse()
  @Get("")
  async getAllKeys(@Req() req, @Query() query: GetApiKeysQueryDto) {
    return this.keysService.getAllUserKeys(req.user.id, query);
  }

  @Patch("/delete")
  async deleteKeys(@Body() dto: SoftDelete, @Req() req) {
    return await this.keysService.softDelete(dto.apiKeyId, req.user.id);
  }

  @Patch("/:id")
  async updateUserKeys(
    @Param("id") id: string,
    @Body() dto: ApiKeyRequestDto,
    @Req() req
  ) {
    return await this.keysService.updateUserKeys(
      req.user.id,
      id,
      dto.keyName
    );
  }
}
