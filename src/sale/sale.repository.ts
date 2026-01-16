import { Injectable, Logger } from "@nestjs/common";
import {
  OrderActivity,
  OrderStatus,
  PaymentStatus,
  Prisma,
  Sale,
} from "@prisma/client";
import { CONSTANT, MESSAGES } from "src/constants";
import { LOGIN_TYPE } from "src/constants/enums";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SaleRepository {
  constructor(private prisma: PrismaService) { }
  private readonly logger = new Logger();
  async createSale(params: {
    data: Prisma.SaleUncheckedCreateInput;
  }): Promise<Sale> {
    try {
      const { data } = params;
      return await this.prisma.sale.create({
        data,
      });
    } catch (error) {
      this.logger.error(error);
      if (error.code === CONSTANT.DB_ERROR_CODE.FOREIGN_KEY) {
        throw new Error(MESSAGES.ERROR.NFT.NOT_FOUND);
      }
      throw new Error(MESSAGES.ERROR.SALE.CREATE_FAILED);
    }
  }

  async updateSale(params: {
    where: Prisma.SaleWhereUniqueInput;
    data: Prisma.SaleUncheckedUpdateInput;
  }): Promise<Sale> {
    try {
      const { where, data } = params;
      return await this.prisma.sale.update({ where, data });
    } catch (error) {
      if (error.code === CONSTANT.DB_ERROR_CODE.NOT_FOUND) {
        throw new Error(MESSAGES.ERROR.SALE.NOT_FOUND);
      }
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.SALE.UPDATE_FAILED);
    }
  }

  async getAllSales(params: {
    where?: Prisma.SaleWhereInput;
    select?: Prisma.SaleSelect;
    include?: Prisma.SaleInclude;
    orderBy?: Prisma.SaleOrderByWithAggregationInput;
    take?: number;
    skip?: number;
  }): Promise<{ sales: Sale[]; count: number }> {
    try {
      const { where } = params;
      const [sales, count] = await this.prisma.$transaction([
        this.prisma.sale.findMany({ ...params }),
        this.prisma.sale.count({
          where,
        }),
      ]);
      return {
        sales,
        count,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.SALE.FETCH_FAILED);
    }
  }

  async getSalesSummary() {
    try {
      const totalSalesThroughDapp = await this.prisma.order.aggregate({
        where: { paymentStatus: PaymentStatus.PAID },
        _sum: { totalAmount: true },
      });
      return {
        totalSalesThroughNft: 0,
        totalSalesThroughDapp: totalSalesThroughDapp?._sum?.totalAmount || 0,
      };
    } catch (error) {
      throw error;
    }
  }

  async groupBySale(
    params: {
      by: [Prisma.SaleScalarFieldEnum];
      _count?: Prisma.SaleCountAggregateInputType;
      _min?: Prisma.SaleMinAggregateInputType;
      _max?: Prisma.SaleMaxAggregateInputType;
      having?;
      where?: Prisma.SaleWhereInput;
    },
    nftId: string
  ) {
    try {
      const [summary, count] = await this.prisma.$transaction([
        this.prisma.sale.groupBy(params),
        this.prisma.client.count({ where: { nftId } }),
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

  async getAllSalesStrainsWithRevenue(
    loginType: LOGIN_TYPE,
    nftId: string,
    startDate: Date,
    endDate: Date,
    countryCodes: string[],
    clientIds: string[],
    tokenIds: number[],
    search: string,
    take: number,
    skip: number
  ) {
    try {
      const CHUNK_SIZE = 500; 
      let bySearch = "";
      let joinByNft = "";
      let byNftIds = "";
      let byCountryCode = "";
      let byClientIds = "";
      let byDateRange = "";
      if (startDate && endDate) {
        endDate.setDate(endDate.getDate() + 1);
        const startDateForRawQuery = new Date(startDate)
          .toISOString()
          .split("T")[0]; // Extract date and convert to UTC format
        const endDateTimeForRawQuery = new Date(endDate)
          .toISOString()
          .split("T")[0]; // Extract date and convert to UTC format
        byDateRange += `AND o."createdAt" >= Date('${startDateForRawQuery}') AND o."createdAt" <= Date('${endDateTimeForRawQuery}')`;
      }

      if (loginType === LOGIN_TYPE.DAPP && nftId) {
        byNftIds = ` AND o."nftId" = '${nftId}'`;
      } else if (loginType === LOGIN_TYPE.ADMIN && tokenIds) {
        joinByNft = `JOIN "Nft" n ON n."id" = o."nftId"`;
        byNftIds = ` AND n."tokenId" in (${tokenIds.join(",")})`;
      }

      if (countryCodes) {
        byCountryCode += `AND sh."countryCode" IN ('${countryCodes.join("', '")}')`;
      }
      if (clientIds) {
        byClientIds += `AND c.id IN ('${clientIds.join("', '")}')`;
      }
      if (search) {
        bySearch += `AND s.name ILIKE '%${search}%'`;
      }

      if (take > CHUNK_SIZE) {
        let allData: any[] = [];
        let skipCount = skip;
        let remaining = take;

        while (remaining > 0) {
          const chunkTake = Math.min(CHUNK_SIZE, remaining);
          const chunkData = await this.fetchSalesStrainsWithRevenueChunk(
            joinByNft,
            byNftIds,
            byDateRange,
            byCountryCode,
            byClientIds,
            bySearch,
            chunkTake,
            skipCount
          );

          if (chunkData.length === 0) {
            break; // No more data to fetch
          }

          allData.push(...chunkData);
          skipCount += chunkTake;
          remaining -= chunkTake;
        }

        const count = await this.getSalesStrainsCount(
          joinByNft,
          byNftIds,
          byDateRange,
          byCountryCode,
          byClientIds,
          bySearch,
        );

        return [allData, count];
      }

      const [data, count] = await Promise.all([
        this.fetchSalesStrainsWithRevenueChunk(
          joinByNft,
          byNftIds,
          byDateRange,
          byCountryCode,
          byClientIds,
          bySearch,
          take,
          skip
        ),
        this.getSalesStrainsCount(
          joinByNft,
          byNftIds,
          byDateRange,
          byCountryCode,
          byClientIds,
          bySearch,
        ),
      ]);

      return [data, count];
    } catch (error) {
      throw error;
    }
  }
  async fetchSalesStrainsWithRevenueChunk(
    joinByNft: string,
    byNftIds: string,
    byDateRange: string,
    byCountryCode: string,
    byClientIds: string,
    bySearch: string,
    take: number,
    skip: number
  ): Promise<any[]> {


    const query = `SELECT
      s.id AS "strainId",
      s."name" AS "strainName",
      s."wholeSalePrice",
      s."retailPrice",
      COALESCE (SUM(ol.quantity)::INT, 0) as "totalQuantity",
      COALESCE(SUM(s."retailPrice" * ol.quantity)::INT, 0) AS "totalSales",
      COALESCE(SUM(s."retailPrice" * ol.quantity)::INT, 0) AS "totalRevenue"
      FROM "Order" o 
      JOIN "OrderLine" ol ON o.id = ol."orderId"
      JOIN "Strain" s ON ol."strainId" = s.id
      JOIN "Client" c ON o."clientId" = c.id
      ${joinByNft}
      LEFT JOIN "Shipping" sh ON c.id = sh."clientId"
      WHERE o."paymentStatus" = '${PaymentStatus.PAID}' AND o."orderStatus" = '${OrderStatus.DELIVERED}'
      ${byNftIds}
      ${byDateRange}
      ${byCountryCode}
      ${byClientIds}
      ${bySearch}
      GROUP BY s.id, s."name", s."wholeSalePrice", s."retailPrice"
      ORDER BY "totalSales" DESC
      LIMIT ${take} OFFSET ${skip}`;

    // TODO: enable it in production server

    // const query = `SELECT
    // s.id AS "strainId",
    // s."name" AS "strainName",
    // s."wholeSalePrice",
    // s."retailPrice",
    // COALESCE (SUM(ol.quantity)::INT, 0) as "totalQuantity",
    // COALESCE(SUM(s."retailPrice" * ol.quantity)::INT, 0) AS "totalSales",
    // COALESCE(SUM(s."retailPrice" * ol.quantity)::INT, 0) AS "totalRevenue"
    // FROM "Order" o 
    // JOIN "OrderLine" ol ON o.id = ol."orderId"
    // JOIN "Strain" s ON ol."strainId" = s.id
    // JOIN "Client" c ON o."clientId" = c.id
    // ${joinByNft}
    // LEFT JOIN "Shipping" sh ON c.id = sh."clientId"
    // JOIN "OrderLogs" olg ON o.id = olg."orderId" AND olg."activity" = '${OrderActivity.Delivered}'
    // WHERE olg."createdAt" <= NOW() - INTERVAL '${CONSTANT.DELEVERY_REFUND_DURATION}'
    // ${byNftIds}
    // ${byDateRange}
    // ${byCountryCode}
    // ${byClientIds}
    // ${bySearch}
    // GROUP BY s.id, s."name", s."wholeSalePrice", s."retailPrice"
    // ORDER BY "totalSales" DESC
    // LIMIT ${take} OFFSET ${skip}`;

    return this.prisma.$queryRawUnsafe(query);
  }


  async getSalesStrainsCount(joinByNft: string,
    byNftIds: string,
    byDateRange: string,
    byCountryCode: string,
    byClientIds: string,
    bySearch: string,): Promise<any[]> {


    const query = `SELECT
      count(s.id)::INT
      FROM "Order" o 
      JOIN "OrderLine" ol ON o.id = ol."orderId"
      JOIN "Strain" s ON ol."strainId" = s.id
      JOIN "Client" c ON o."clientId" = c.id
      ${joinByNft}
      LEFT JOIN "Shipping" sh ON c.id = sh."clientId"
      WHERE o."paymentStatus" = '${PaymentStatus.PAID}' AND o."orderStatus" = '${OrderStatus.DELIVERED}'
      ${byNftIds}
      ${byDateRange}
      ${byCountryCode}
      ${byClientIds}
      ${bySearch}
      GROUP BY s.id, s."name", s."wholeSalePrice", s."retailPrice"`;

    // TODO: enable it in production server

    // const query = `SELECT
    // count(s.id)::INT
    // FROM "Order" o 
    // JOIN "OrderLine" ol ON o.id = ol."orderId"
    // JOIN "Strain" s ON ol."strainId" = s.id
    // JOIN "Client" c ON o."clientId" = c.id
    // ${joinByNft}
    // LEFT JOIN "Shipping" sh ON c.id = sh."clientId"
    // JOIN "OrderLogs" olg ON o.id = olg."orderId" AND olg."activity" = '${OrderActivity.Delivered}'
    // WHERE olg."createdAt" <= NOW() - INTERVAL '${CONSTANT.DELEVERY_REFUND_DURATION}'
    // ${byNftIds}
    // ${byDateRange}
    // ${byCountryCode}
    // ${byClientIds}
    // ${bySearch}
    // GROUP BY s.id, s."name", s."wholeSalePrice", s."retailPrice"`;

    return this.prisma.$queryRawUnsafe(query);
  }






  async getRevenueSummary(loginType: LOGIN_TYPE, nftId: string) {
    try {
      let byNftId = "";
      if (loginType == LOGIN_TYPE.DAPP && nftId) {
        byNftId += ` AND o."nftId" = '${nftId}'`;
      }
      const totalSales: any = await this.prisma.$queryRawUnsafe(`SELECT 
      COALESCE(SUM(s."retailPrice" * ol.quantity), 0)::INT AS "totalSales"
      FROM "Order" o JOIN "OrderLine" ol ON o.id = ol."orderId"
      JOIN "Strain" s ON ol."strainId" = s.id
      WHERE o."paymentStatus" = 'PAID' ${byNftId}`);

      const totalRevenue = await this.prisma.$queryRawUnsafe(`SELECT 
      COALESCE(SUM(s."retailPrice" * ol.quantity), 0)::INT AS "totalProfit"
      FROM "Order" o JOIN "OrderLine" ol ON o.id = ol."orderId"
      JOIN "Strain" s ON ol."strainId" = s.id
      WHERE o."paymentStatus" = '${PaymentStatus.PAID}' AND o."orderStatus" = '${OrderStatus.DELIVERED}' ${byNftId}`);

      // TODO: enable it in production server

      // const totalRevenue = await this.prisma.$queryRawUnsafe(`SELECT 
      // COALESCE(SUM(s."retailPrice" * ol.quantity), 0)::INT AS "totalProfit"
      // FROM "Order" o JOIN "OrderLine" ol ON o.id = ol."orderId"
      // JOIN "Strain" s ON ol."strainId" = s.id
      // JOIN "OrderLogs" olg ON o.id = olg."orderId"
      // WHERE olg."activity" = '${OrderActivity.Delivered}' ${byNftId}
      // AND olg."createdAt" <= NOW() - INTERVAL '${CONSTANT.DELEVERY_REFUND_DURATION}'`);
      return { totalSales: totalSales[0].totalSales, totalProfit: totalRevenue[0].totalProfit };
    } catch (error) {
      throw error;
    }
  }

  async getRevenueChartData(
    loginType: LOGIN_TYPE,
    nftId: string,
    startDate: Date,
    endDate: Date,
    parameter: string,
    tokenIds: number[],
    countryCodes: string[],
    clientIds: string[]
  ) {
    try {
      let joinBy = "";
      let joinByNft = "";
      let byNftIds = "";
      let byCountryCode = "";
      let byClientIds = "";
      endDate.setDate(endDate.getDate() + 1);
      const startDateForRawQuery = new Date(startDate)
        .toISOString()
        .split("T")[0]; // Extract date and convert to UTC format
      const endDateTimeForRawQuery = new Date(endDate)
        .toISOString()
        .split("T")[0]; // Extract date and convert to UTC format

      if (loginType === LOGIN_TYPE.DAPP && nftId) {
        byNftIds = ` AND o."nftId" = '${nftId}'`;
      } else if (loginType === LOGIN_TYPE.ADMIN && tokenIds) {
        joinByNft = `JOIN "Nft" n ON n."id" = o."nftId"`;
        byNftIds = ` AND n."tokenId" in (${tokenIds.join(",")})`;
      }

      if (clientIds) {
        byClientIds += `AND c.id in ('${clientIds.join("', '")}')`;
      }

      if (countryCodes) {
        joinBy += ` LEFT JOIN "Shipping" sh ON c.id = sh."clientId"`;
        byCountryCode += `AND sh."countryCode" in ('${countryCodes.join("', '")}')`;
      }

      const data = await this.prisma.$queryRawUnsafe(`SELECT 
      DATE_TRUNC('${parameter}', o."createdAt") AS RANGE,
      SUM(s."retailPrice" * ol.quantity) AS "data"
      FROM "Order" o
      JOIN "OrderLine" ol ON o.id = ol."orderId"
      JOIN "Strain" s ON ol."strainId" = s.id
      JOIN "Client" c ON o."clientId" = c.id 
      ${joinByNft}
      ${joinBy}
      WHERE o."paymentStatus" = '${PaymentStatus.PAID}' AND o."orderStatus" = '${OrderStatus.DELIVERED}' ${byNftIds}
      AND o."createdAt" >= Date('${startDateForRawQuery}') AND o."createdAt" <= Date('${endDateTimeForRawQuery}') 
      ${byCountryCode} ${byClientIds}
      GROUP BY RANGE
      ORDER BY RANGE ASC;`);

      // TODO: enable it in production server

      // const data = await this.prisma.$queryRawUnsafe(`SELECT 
      //   DATE_TRUNC('${parameter}', o."createdAt") AS RANGE,
      //   SUM(s."retailPrice" * ol.quantity) AS "data"
      //   FROM "Order" o
      //   JOIN "OrderLine" ol ON o.id = ol."orderId"
      //   JOIN "Strain" s ON ol."strainId" = s.id
      //   JOIN "Client" c ON o."clientId" = c.id 
      //   ${joinByNft}
      //   ${joinBy}
      //   JOIN "OrderLogs" olg ON o.id = olg."orderId"
      //   WHERE olg."activity" = '${OrderActivity.Delivered}' ${byNftIds}
      //   AND olg."createdAt" <= NOW() - INTERVAL '${CONSTANT.DELEVERY_REFUND_DURATION}'
      //   AND o."createdAt" >= Date('${startDateForRawQuery}') AND o."createdAt" <= Date('${endDateTimeForRawQuery}') 
      //   ${byCountryCode} ${byClientIds}
      //   GROUP BY RANGE
      //   ORDER BY RANGE ASC;`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
