import { Injectable, Logger } from "@nestjs/common";
import { PlanetDetail, Prisma } from "@prisma/client";
import { MESSAGES } from "src/constants";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PlanetRepository {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger();

  async getAllPlanets(params: {
    where?: Prisma.PlanetDetailWhereInput;
    select?: Prisma.PlanetDetailSelect;
    orderBy?: Prisma.PlanetDetailOrderByWithAggregationInput;
    take?: number;
    skip?: number;
    include?: Prisma.PlanetDetailInclude;
  }): Promise<{ planets: PlanetDetail[]; count: number }> {
    try {
      const extendedParams = {
        ...params,
        where: {
          ...params.where,
          deletedAt: null,
        },
      };

      const { where } = extendedParams;
      const [planets, count] = await this.prisma.$transaction([
        this.prisma.planetDetail.findMany({ ...extendedParams }),
        this.prisma.planetDetail.count({
          where,
        }),
      ]);
      return {
        planets,
        count,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.PLANET.FETCH_FAILED);
    }
  }
}
