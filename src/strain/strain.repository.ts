import { Injectable, Logger } from "@nestjs/common";
import { Prisma, Strain } from "@prisma/client";
import { CONSTANT, MESSAGES } from "src/constants";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StrainRepository {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger();

  async getAllLocations() {
    try {
      return await this.prisma.location.findMany({
        select: { id: true, country: true, countryCode: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async createStrain(params: {
    data: Prisma.StrainCreateInput;
  }): Promise<Strain> {
    try {
      const { data } = params;
      return await this.prisma.strain.create({
        data,
      });
    } catch (error) {
      this.logger.error(error);
      if (error.code === CONSTANT.DB_ERROR_CODE.FOREIGN_KEY) {
        throw new Error(MESSAGES.ERROR.STRAIN.PLANET_NOT_EXIST);
      }
      throw new Error(MESSAGES.ERROR.STRAIN.CREATE_FAILED);
    }
  }

  async getStrainById(params: {
    where: Prisma.StrainWhereUniqueInput;
    include?: Prisma.StrainInclude;
    select?: Prisma.StrainSelect;
  }): Promise<Strain | any> {
    try {
      const { where, select } = params;
      return await this.prisma.strain.findUnique({
        where,
        select,
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.STRAIN.FETCH_FAILED);
    }
  }

  async updateStrain(params: {
    where: Prisma.StrainWhereUniqueInput;
    data: Prisma.StrainUncheckedUpdateInput;
  }): Promise<Strain> {
    try {
      const { where, data } = params;
      return await this.prisma.strain.update({ where, data });
    } catch (error) {
      if (error.code === CONSTANT.DB_ERROR_CODE.NOT_FOUND) {
        throw new Error(MESSAGES.ERROR.STRAIN.NOT_FOUND);
      }
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.STRAIN.UPDATE_FAILED);
    }
  }

  async deleteStrainLocations(strainId: string) {
    try {
      return await this.prisma.strainLocation.deleteMany({
        where: { strainId },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteStrainPlanets(strainId: string) {
    try {
      return await this.prisma.planetStrain.deleteMany({
        where: { strainId },
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllStrains(params: {
    where?: Prisma.StrainWhereInput;
    select?: Prisma.StrainSelect;
    include?: Prisma.StrainInclude;
    orderBy?: Prisma.StrainOrderByWithAggregationInput;
    take?: number;
    skip?: number;
  }): Promise<{ strains: Strain[]; count: number }> {
    try {
      const { where } = params;
      const [strains, count] = await this.prisma.$transaction([
        this.prisma.strain.findMany({ ...params }),
        this.prisma.strain.count({
          where,
        }),
      ]);
      return {
        strains,
        count,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.STRAIN.FETCH_FAILED);
    }
  }

}
