import { Injectable, Logger } from "@nestjs/common";
import { PaymentStatus, Prisma } from "@prisma/client";
import { MESSAGES } from "src/constants";
import { PrismaService } from "src/prisma/prisma.service";
import { filterBy } from "./dashboard.dto";
import { UserRepository } from "src/user/user.repository";

@Injectable()
export class DashboardRepository {
  constructor(
    private prisma: PrismaService,
    private readonly userRepository: UserRepository
  ) {}
  private readonly logger = new Logger();

  async getSummary() {
    try {
      const totalMintedNFTs = await this.prisma.nft.count({
        where: { ownerId: { not: null } },
      });
      const totalNFTsOnSale = await this.prisma.nftSale.count({
        where: { isListed: true },
      });
      const totalSalesThroughNft = 0;
      const totalSalesThroughDapp = await this.prisma.order.aggregate({
        where: { paymentStatus: PaymentStatus.PAID },
        _sum: { totalAmount: true },
      });
      const totalClients = await this.prisma.client.count();
      const totalOrders = await this.prisma.order.count();
      return {
        summary: {
          totalMintedNFTs,
          totalNFTsOnSale,
          totalSalesThroughNft,
          totalSalesThroughDapp: totalSalesThroughDapp?._sum?.totalAmount || 0,
          totalClients,
          totalOrders,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async getDappSummary(params: {
    clientWhere?: Prisma.ClientWhereInput;
    orderWhere?: Prisma.OrderWhereInput;
    strainWhere?: Prisma.StrainWhereInput;
    estimateProfitWhere?: Prisma.OrderWhereInput;
    totalProfitWhere?: Prisma.OrderWhereInput;
  }) {
    try {
      const [
        clientCount,
        orderCount,
        productCount,
        estimateProfit,
        totalProfit,
      ] = await this.prisma.$transaction([
        this.prisma.client.count({
          where: params.clientWhere,
        }),
        this.prisma.order.count({
          where: params.orderWhere,
        }),
        this.prisma.strain.count({
          where: params.strainWhere,
        }),
        this.prisma.order.aggregate({
          where: params.estimateProfitWhere,
          _sum: {
            agentProfit: true,
          },
        }),
        this.prisma.order.aggregate({
          where: params.totalProfitWhere,
          _sum: {
            agentProfit: true,
          },
        }),
      ]);
      return {
        clientCount,
        orderCount,
        productCount,
        estimateProfit: estimateProfit._sum.agentProfit,
        totalProfit: totalProfit._sum.agentProfit,
        profitRecieved: Math.round(
          totalProfit._sum.agentProfit - estimateProfit._sum.agentProfit
        ),
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.DASHBOARD.SUMMARY_FAILED);
    }
  }

  async getAnalytics(
    params: {
      startDate: Date;
      endDate: Date;
      filterBy: string;
      parameter: string;
    },
    nftId: string
  ): Promise<{
    graphData: any[];
    meta: {
      parameter: string;
    };
  }> {
    try {
      const graphData: [] =
        params.filterBy !== filterBy.PROFIT
          ? await this.prisma.$queryRaw`SELECT
              DATE_TRUNC(${params.parameter}, "createdAt")
                AS  RANGE,  COUNT(*)::INT as data
              FROM "${Prisma.raw(params.filterBy)}"
              where 
              "createdAt" >= ${new Date(params.startDate)}
              AND "createdAt" <= ${new Date(params.endDate)}
              AND "nftId" = ${nftId}
              GROUP BY RANGE
              order by RANGE ASC`
          : await this.prisma.$queryRaw`SELECT
              DATE_TRUNC(${params.parameter}, "createdAt")
                AS  RANGE,   SUM("agentProfit")::Float as data
              FROM "Order"
              where 
              "createdAt" >= ${new Date(params.startDate)}
              AND "createdAt" <= ${new Date(params.endDate)}
              AND "nftId" = ${nftId}
              GROUP BY RANGE
              order by RANGE ASC`;

      const meta = {
        parameter: params.parameter,
      };

      return {
        graphData,
        meta,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.DASHBOARD.ANALYTICS_FAILED);
    }
  }
}
