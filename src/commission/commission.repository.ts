import { Injectable, Logger } from "@nestjs/common";
import { Prisma, Role } from "@prisma/client";
import { AgentsCommissionSummary } from "src/common/response.dto";
import { MESSAGES } from "src/constants";
import { PrismaService } from "src/prisma/prisma.service";
import { STATUS } from "src/user/user.dto";

@Injectable()
export class CommissionRepository {
  constructor(private prisma: PrismaService) { }
  private readonly logger = new Logger();

  async isCommissionExist(params: { where?: Prisma.CommissionsWhereInput }) {
    const exist = await this.prisma.commissions.findFirst({ ...params });
    if (exist) {
      return true;
    } else {
      return false;
    }
  }

  async getAllCommissions(params: {
    where?: Prisma.CommissionsWhereInput;
    select?: Prisma.CommissionsSelect;
    orderBy?: Prisma.CommissionsOrderByWithAggregationInput;
    take?: number;
    skip?: number;
    include?: Prisma.CommissionsInclude;
  }): Promise<{ commissions: any[]; count: number }> {
    try {
      const CHUNK_SIZE = 500;
      const extendedParams = {
        ...params,
        where: {
          ...params.where,
        },
      };

      const { where, take } = extendedParams;


      if (take && take > CHUNK_SIZE) {
        const commissions: any[] = [];
        let skipCount = params.skip || 0;
        let remaining = take;

        while (remaining > 0) {
          const chunkTake = Math.min(CHUNK_SIZE, remaining);
          const chunkCommissions = await this.prisma.commissions.findMany({
            ...extendedParams,
            skip: skipCount,
            take: chunkTake,
          });

          if (chunkCommissions.length === 0) {
            break;
          }

          commissions.push(...chunkCommissions);
          skipCount += chunkTake;
          remaining -= chunkTake;
        }

        const count = await this.prisma.commissions.count({ where });
        return { commissions, count };
      }


      const [commissions, count] = await this.prisma.$transaction([
        this.prisma.commissions.findMany({ ...extendedParams }),
        this.prisma.commissions.count({ where }),
      ]);

      return { commissions, count };
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.COMMISSION.FETCH_FAILED);
    }
  }

  async groupByCommission(params: {
    by: [Prisma.CommissionsScalarFieldEnum];
    _count?: Prisma.CommissionsCountAggregateInputType;
    _sum?: Prisma.CommissionsSumAggregateInputType;
    _min?: Prisma.CommissionsMinAggregateInputType;
    _max?: Prisma.CommissionsMaxAggregateInputType;
    having?;
    where?: Prisma.CommissionsWhereInput;
  }) {
    try {
      const [summary] = await this.prisma.$transaction([
        this.prisma.commissions.groupBy(params),
      ]);

      return {
        summary,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.COMMISSION.SUMMARY_FAILED);
    }
  }

  async getCommissionSummary(
    nftId: string,
    isAgent: boolean,
    agentId: string,
    agentStatus: STATUS
  ): Promise<AgentsCommissionSummary> {
    try {
      let byNftId = "";
      if (nftId) {
        byNftId = ` and o."nftId" = '${nftId}'`;
      }
      let agentsCount: number;
      let activeAgentsCount: number;
      let inActiveAgentsCount: number;
      let totalPaidCommission: number = 0;
      let totalPendingCommission: number = 0;

      if (nftId) {
        const [activeGroup, inActiveGroup] = await Promise.all([
          this.prisma.userNftRoleAssociation.groupBy({
            by: ["userId"],
            where: { user: { role: Role.MANAGER }, nft: { id: nftId } },
          }),
          this.prisma.commissions.groupBy({
            by: ["userId"],
            where: {
              user: {
                role: Role.MANAGER,
                UserNftRoleAssociation: {
                  every: { nft: { id: { notIn: [nftId] } } },
                },
              },
              order: { nftId },
            },
          }),
        ]);

        activeAgentsCount = activeGroup.length;
        inActiveAgentsCount = inActiveGroup.length;

        if (isAgent) {
          const activeCommissionAmount = await this.prisma.commissions.groupBy({
            by: ["paymentStatus"],
            where: {
              user: {
                id: agentId ? agentId : undefined,
                role: Role.MANAGER,
                UserNftRoleAssociation: {
                  some: { nft: { id: nftId } },
                },
              },
              order: { nftId },
            },
            _sum: { amountInDollar: true },
          });

          const inActiveCommissionAmount =
            await this.prisma.commissions.groupBy({
              by: ["paymentStatus"],
              where: {
                user: {
                  id: agentId ? agentId : undefined,
                  role: Role.MANAGER,
                  UserNftRoleAssociation: {
                    every: { nft: { id: { notIn: [nftId] } } },
                  },
                },
                order: { nftId },
              },
              _sum: { amountInDollar: true },
            });

          let activePaidCommission = 0;
          let activePendingCommission = 0;
          let inActivePaidCommission = 0;
          let inActivePendingCommission = 0;
          activeCommissionAmount.forEach((item) => {
            if (item.paymentStatus === "PAID") {
              activePaidCommission = item._sum.amountInDollar;
            } else if (item.paymentStatus === "PENDING") {
              activePendingCommission = item._sum.amountInDollar;
            }
          });
          inActiveCommissionAmount.forEach((item) => {
            if (item.paymentStatus === "PAID") {
              inActivePaidCommission = item._sum.amountInDollar;
            } else if (item.paymentStatus === "PENDING") {
              inActivePendingCommission = item._sum.amountInDollar;
            }
          });

          if (agentStatus === STATUS.ACTIVE) {
            agentsCount = activeAgentsCount;
            totalPaidCommission = activePaidCommission;
            totalPendingCommission = activePendingCommission;
          } else if (agentStatus === STATUS.INACTIVE) {
            agentsCount = inActiveAgentsCount;
            totalPaidCommission = inActivePaidCommission;
            totalPendingCommission = inActivePendingCommission;
          } else {
            agentsCount = activeAgentsCount + inActiveAgentsCount;
            totalPaidCommission = activePaidCommission + inActivePaidCommission;
            totalPendingCommission =
              activePendingCommission + inActivePendingCommission;
          }
        } else {
          agentsCount = activeAgentsCount + inActiveAgentsCount;
          const commissionAmount = await this.prisma.commissions.groupBy({
            by: ["paymentStatus"],
            where: { user: { role: Role.USER }, order: { nftId } },
            _sum: { amountInDollar: true },
          });
          commissionAmount.forEach((item) => {
            if (item.paymentStatus === "PAID") {
              totalPaidCommission = item._sum.amountInDollar;
            } else if (item.paymentStatus === "PENDING") {
              totalPendingCommission = item._sum.amountInDollar;
            }
          });
        }
      } else {
        const agentsGroup = await this.prisma.userNftRoleAssociation.groupBy({
          by: ["userId"],
          where: { user: { role: Role.MANAGER } },
        });
        agentsCount = agentsGroup.length;
        const commissionAmount = await this.prisma.commissions.groupBy({
          by: ["paymentStatus"],
          where: { user: { role: Role.MANAGER } },
          _sum: { amountInDollar: true },
        });
        commissionAmount.forEach((item) => {
          if (item.paymentStatus === "PAID") {
            totalPaidCommission = item._sum.amountInDollar;
          } else if (item.paymentStatus === "PENDING") {
            totalPendingCommission = item._sum.amountInDollar;
          }
        });
      }

      const totalSales: any = await this.prisma.$queryRawUnsafe(`SELECT 
      COALESCE(SUM(s."retailPrice" * ol.quantity), 0)::INT AS "totalSales"
      FROM "Order" o JOIN "OrderLine" ol ON o.id = ol."orderId"
      JOIN "Strain" s ON ol."strainId" = s.id
      WHERE o."paymentStatus" = 'PAID' ${byNftId}`);

      return {
        totalAgents: agentId ? undefined : agentsCount,
        activeAgents: activeAgentsCount,
        inActiveAgents: inActiveAgentsCount,
        totalSales:
          isAgent || (isAgent && agentId)
            ? totalSales[0].totalSales
            : undefined,
        totalCommission: totalPaidCommission + totalPendingCommission,
        totalPaidCommission,
        totalPendingCommission,
      };
    } catch (error) {
      throw error;
    }
  }
}
