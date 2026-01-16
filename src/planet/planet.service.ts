import { Injectable, Logger } from "@nestjs/common";
import { CreatePlanetDto, UpdatePlanetDto } from "./dto/request.dto";
import { PlanetRepository } from "./planet.repository";
import { PlanetDetail, Prisma } from "@prisma/client";
import { CONSTANT } from "src/constants";
import { StrainRepository } from "src/strain/strain.repository";

@Injectable()
export class PlanetService {
  constructor(
    private readonly planetRepository: PlanetRepository,
    private readonly strainRepository: StrainRepository
  ) {}
  private readonly logger = new Logger();

  async getAllPlanetsList() {
    try {
      const { planets, count } = await this.planetRepository.getAllPlanets({
        select: { planetNo: true, name: true },
      });
      return {
        planets,
        paginationCount: count,
      };
    } catch (error) {
      throw error;
    }
  }

}
