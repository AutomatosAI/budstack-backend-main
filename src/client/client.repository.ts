import { Injectable, Logger } from "@nestjs/common";
import { Client, Prisma } from "@prisma/client";
import { MESSAGES } from "src/constants";
import { PrismaService } from "src/prisma/prisma.service";
import { UtilsService } from "src/utils/utils.service";

@Injectable()
export class ClientRepository {
  constructor(
    private prisma: PrismaService,
    private readonly utilService: UtilsService
  ) {}
  private readonly logger = new Logger();

  async createClient(params: {
    data: Prisma.ClientUncheckedCreateInput;
  }): Promise<Client> {
    try {
      const { data } = params;
      return await this.prisma.client.create({
        data,
        include: { medicalRecord: true },
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.CLIENT.CREATE_FAILED);
    }
  }

  async updateClient(params: {
    where: Prisma.ClientWhereUniqueInput;
    data: Prisma.ClientUncheckedUpdateInput;
  }): Promise<Client> {
    try {
      const { where, data } = params;
      return await this.prisma.client.update({
        where,
        data,
        include: { medicalRecord: true },
      });
    } catch (error) {
      if (error.code === "P2025") {
        throw new Error(MESSAGES.ERROR.CLIENT.NOT_FOUND);
      }
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.CLIENT.UPDATE_FAILED);
    }
  }

  async updateClientsApproval(params: {
    where: Prisma.ClientWhereInput;
    data: Prisma.ClientUpdateInput;
  }) {
    try {
      const { where, data } = params;
      return await this.prisma.client.updateMany({ where, data });
    } catch (error) {
      if (error.code === "P2025") {
        throw new Error(MESSAGES.ERROR.CLIENT.NOT_FOUND);
      }
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.CLIENT.UPDATE_FAILED);
    }
  }

  async createClientLogs(params: {
    data?: Prisma.ClientLogsCreateManyInput[];
  }) {
    try {
      const { data } = params;
      return await this.prisma.clientLogs.createMany({
        data,
        skipDuplicates: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllClients(params: {
    where?: Prisma.ClientWhereInput;
    select?: Prisma.ClientSelect;
    orderBy?: Prisma.ClientOrderByWithAggregationInput;
    take?: number;
    skip?: number;
    include?: Prisma.ClientInclude;
  }): Promise<{ clients: Client[]; count: number }> {
    try {
      const CHUNK_SIZE = 500;
      const extendedParams = {
        ...params,
        where: {
          ...params.where,
          deletedAt: null,
        },
      };

      const { where, take } = extendedParams;

      if (take && take > CHUNK_SIZE) {
        const clients: Client[] = [];
        let skipCount = params.skip || 0;
        let remaining = take;
        while (remaining > 0) {
          const chunkTake = Math.min(CHUNK_SIZE, remaining);
          const chunkClients = await this.prisma.client.findMany({
            ...extendedParams,
            skip: skipCount,
            take: chunkTake,
          });

          if (chunkClients.length === 0) {
            break;
          }

          clients.push(...chunkClients);
          skipCount += chunkTake;
          remaining -= chunkTake;
        }

        const count = await this.prisma.client.count({ where });
        return { clients, count };
      }

      const [clients, count] = await this.prisma.$transaction([
        this.prisma.client.findMany({ ...extendedParams }),
        this.prisma.client.count({ where }),
      ]);
      return { clients, count };
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.CLIENT.FETCH_FAILED);
    }
  }
  async getClientById(params: {
    where: Prisma.ClientWhereUniqueInput;
    include?: Prisma.ClientInclude;
    select?: Prisma.ClientSelect;
  }): Promise<Client | any> {
    try {
      const { where, select } = params;
      return await this.prisma.client.findUnique({
        where,
        select,
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.CLIENT.FETCH_FAILED);
    }
  }

  async getClientDetails(params: {
    where: Prisma.ClientWhereInput;
    include?: Prisma.ClientInclude;
    select?: Prisma.ClientSelect;
  }): Promise<Client> {
    try {
      const { where, select } = params;
      return await this.prisma.client.findFirst({
        where,
        select,
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.CLIENT.FETCH_FAILED);
    }
  }

  async groupByClient(params: {
    by: [Prisma.ClientScalarFieldEnum];
    _count?: Prisma.ClientCountAggregateInputType;
    _min?: Prisma.ClientMinAggregateInputType;
    _max?: Prisma.ClientMaxAggregateInputType;
    having?;
    where?: Prisma.ClientWhereInput;
  }) {
    try {
      const [summary, count] = await this.prisma.$transaction([
        this.prisma.client.groupBy(params),
        this.prisma.client.count({ where: params.where }),
      ]);

      return {
        summary,
        count,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.CLIENT.FETCH_FAILED);
    }
  }

  async getClientsStatusBreakdown(
    nftId: string,
    startDate: Date,
    endDate: Date,
    countryCodes: string[]
  ) {
    try {
      let joinBy = "";
      let byCountryCode = "";
      let byNftId = "";
      if (nftId) {
        byNftId += `AND c."nftId" = '${nftId}'`;
      }
      if (countryCodes) {
        joinBy += ` JOIN "Shipping" s ON c.id = s."clientId"`;
        byCountryCode += ` AND s."countryCode" in ('${countryCodes.join("', '")}')`;
      }
      endDate.setDate(endDate.getDate() + 1);
      const startDateForRawQuery = this.utilService.formatDateToUTC(startDate);
      const endDateTimeForRawQuery = this.utilService.formatDateToUTC(endDate);
      const data: any = await this.prisma.$queryRawUnsafe(`SELECT 
        status,
        ROUND((COUNT(*) * 100.0 / total)::numeric, 2) AS percentage
      FROM (
        SELECT 
          CASE 
            WHEN c."adminApproval" = 'PENDING' THEN 'Pending'
            WHEN c."adminApproval" = 'VERIFIED' THEN 'Verified'
            WHEN c."adminApproval" = 'REJECTED' THEN 'Rejected'
          END AS status,
          COUNT(*) OVER () AS total
        FROM "Client" c ${joinBy}
        WHERE c."createdAt" >= DATE('${startDateForRawQuery}')
        AND c."createdAt" <= DATE('${endDateTimeForRawQuery}')
        ${byNftId} ${byCountryCode}
      ) subquery
      GROUP BY status, total`);

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getClientChartData(
    nftId: string,
    startDate: Date,
    endDate: Date,
    parameter: string,
    countryCodes: string[]
  ) {
    try {
      let joinBy = "";
      let byCountryCode = "";
      let byNftId = "";
      if (nftId) {
        byNftId += `AND c."nftId" = '${nftId}'`;
      }
      endDate.setDate(endDate.getDate() + 1);
      const startDateForRawQuery = this.utilService.formatDateToUTC(startDate);
      const endDateTimeForRawQuery = this.utilService.formatDateToUTC(endDate);
      if (countryCodes) {
        joinBy += ` JOIN "Shipping" s ON c.id = s."clientId"`;
        byCountryCode += ` AND s."countryCode" in ('${countryCodes.join("', '")}')`;
      }
      const data = await this.prisma
        .$queryRawUnsafe(`SELECT DATE_TRUNC('${parameter}', c."createdAt") AS RANGE, 
        COUNT(*)::INT data FROM "Client" c ${joinBy} where c."createdAt" >= Date('${startDateForRawQuery}')
        AND c."createdAt" <= Date('${endDateTimeForRawQuery}') ${byNftId}
        ${byCountryCode}
        GROUP BY RANGE order by RANGE asc`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
