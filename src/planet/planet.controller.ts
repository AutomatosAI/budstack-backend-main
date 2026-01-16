import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { PlanetService } from './planet.service';
import { CreatePlanetDto, GetAllPlanetDetailsDto, UpdatePlanetDto, planetNoDto } from './dto/request.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('')
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @Get("planets")
  @ApiResponse({
    status: 200,
    description: 'To get All Planets',
  })
  async getAllPlanetsList() {
    return await this.planetService.getAllPlanetsList()
  }
}
