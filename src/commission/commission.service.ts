import { Inject, Injectable, Logger } from "@nestjs/common";
import { CommissionRepository } from "./commission.repository";
import {
  OrderActivity,
  OrderStatus,
  PaymentStatus,
  Prisma,
  Role,
  User,
} from "@prisma/client";
import { id } from "ethers";
import {
  CommissionSearch,
  GetAllAgentCommissionDto,
  GetAllCommissionDto,
} from "./commission.dto";
import { UtilsService } from "src/utils/utils.service";
import { UserRepository } from "src/user/user.repository";
import { NftRepository } from "src/nft/nft.repository";
import { LOGIN_TYPE } from "src/constants/enums";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import { STATUS } from "src/user/user.dto";
import { CONSTANT } from "src/constants";
import {
  AgentsCommissionSummary,
  CommissionSummary,
} from "src/common/response.dto";

@Injectable()
export class CommissionService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly commissionRepository: CommissionRepository,
    private readonly userRepository: UserRepository,
    private readonly nftRepository: NftRepository,
    private readonly utilsService: UtilsService
  ) {}
  private readonly logger = new Logger();

  async getAllCommissionSummary(
    req
  ): Promise<{ commissionSummary: CommissionSummary }> {
    try {
      return await this.getSummary(undefined, undefined);
    } catch (error) {
      throw error;
    }
  }

  async getAllCommissions(
    query: GetAllCommissionDto,
    tokenId: number,
    user: any
  ): Promise<{ commissions: any[]; paginationCount: number }> {
    try {
      const { id, role, primaryNftId } = user;
      const where: Prisma.CommissionsWhereInput = {
        userId: id,
      };

      if (tokenId) {
        where.order = {
          nft: { tokenId },
        };
      } else if (primaryNftId) {
        where.order = {
          nftId: primaryNftId,
        };
      }

      if (query.search) {
        if (query.searchBy === CommissionSearch.clientName) {
          const searchTerms = query.search.split(" ");
          if (searchTerms.length === 2) {
            const [firstName, lastName] = searchTerms;
            where.order = {
              client: {
                AND: [
                  { firstName: { contains: firstName, mode: "insensitive" } },
                  { lastName: { contains: lastName, mode: "insensitive" } },
                ],
              },
            };
          } else {
            where.order = {
              client: {
                OR: [
                  {
                    firstName: { contains: query.search, mode: "insensitive" },
                  },
                  { lastName: { contains: query.search, mode: "insensitive" } },
                  { email: { contains: query.search, mode: "insensitive" } },
                ],
              },
            };
          }
        }
      }

      if (query.paymentStatus) {
        where.paymentStatus = query.paymentStatus;
      }

      const { commissions, count } =
        await this.commissionRepository.getAllCommissions({
          where,
          select: {
            id: true,
            amountInDollar: true,
            amountInEth: true,
            userId: true,
            paymentStatus: true,
            createdAt: true,
            updatedAt: true,
            order: {
              select: {
                id: true,
                agentProfit: true,
                totalAmount: true,
                orderStatus: true,
                orderLogs: {
                  where: { activity: OrderActivity.Delivered },
                  select: { activity: true, createdAt: true },
                },
                client: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                  },
                },
                orderLines: {
                  select: {
                    id: true,
                    quantity: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: query.orderBy ? query.orderBy : Prisma.SortOrder.desc,
          },
          skip: query.skip,
          take: query.take,
        });

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - CONSTANT.REFUND_DURATION);

      commissions.forEach((commission) => {
        let totalQuantity = 0;
        commission.order.orderLines.forEach((line) => {
          totalQuantity += line.quantity;
        });
        commission.order.totalQuantity = totalQuantity;
        delete commission.order.orderLines;
        let isPayable = false;

        if (commission.order.orderStatus === OrderStatus.DELIVERED) {
          const deliveredLog = commission.order.orderLogs.find(
            (logs) => logs.activity === OrderActivity.Delivered
          );
          if (deliveredLog) {
            const deliveredAt = new Date(deliveredLog.createdAt);
            // isPayable = deliveredAt <= thirtyDaysAgo;
            isPayable = true; // TODO: temporary disabled to pay commissions after 30 days
          }
        }
        commission.isPayable = isPayable;
      });

      return { commissions, paginationCount: count };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getSummary(
    userId: string,
    nftId: string
  ): Promise<{ commissionSummary: CommissionSummary }> {
    try {
      const { summary } = await this.commissionRepository.groupByCommission({
        by: ["paymentStatus"],
        _sum: {
          amountInDollar: true,
          amountInEth: true,
        },
        where: {
          userId,
          order: nftId ? { nftId } : undefined,
        },
      });

      const commissionSummary = {
        [PaymentStatus.PENDING]: {
          amountInDollar: 0,
          amountInEth: 0,
        },
        [PaymentStatus.PAID]: {
          amountInDollar: 0,
          amountInEth: 0,
        },
        totalInDollar: 0,
      };
      let price: number = await this.cacheManager.get("ETH_PRICE");
      if (!price) {
        price = await this.cronJobToUpdateEthPrice();
      }
      summary.map((item) => {
        const { paymentStatus, _sum } = item;
        commissionSummary[paymentStatus].amountInDollar = _sum.amountInDollar;
        commissionSummary[paymentStatus].amountInEth = parseFloat(
          (_sum.amountInDollar * price).toFixed(6)
        );
        return true;
      });
      commissionSummary.totalInDollar =
        commissionSummary.PAID.amountInDollar +
        commissionSummary.PENDING.amountInDollar;

      return { commissionSummary };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAgentsCommissionSummary(
    req,
    loginType: LOGIN_TYPE,
    agentStatus: STATUS
  ): Promise<{ summary: AgentsCommissionSummary }> {
    try {
      const { id, role, primaryNftId } = req.user;
      const data = await this.commissionRepository.getCommissionSummary(
        loginType === LOGIN_TYPE.DAPP ? primaryNftId : undefined,
        true,
        undefined,
        agentStatus
      );
      return { summary: data };
    } catch (error) {
      throw error;
    }
  }

  async getAllAgentsWithCommission(
    req,
    loginType: LOGIN_TYPE,
    query: GetAllAgentCommissionDto
  ): Promise<{ managers: any; paginationCount: number }> {
    try {
      const { id, role, primaryNftId } = req.user;
      let { search, agentStatus, skip, take, orderBy } = query;
      const tokenId = await this.getNftIdIfDapp(loginType, primaryNftId);
      const { users, count } =
        await this.userRepository.getUsersWithCommissions(
          tokenId,
          Role.MANAGER,
          agentStatus,
          undefined,
          search,
          skip,
          take,
          orderBy
        );
      return { managers: users, paginationCount: count };
    } catch (error) {
      throw error;
    }
  }

  private async getNftIdIfDapp(
    loginType: LOGIN_TYPE,
    primaryNftId?: string
  ): Promise<number | undefined> {
    if (loginType === LOGIN_TYPE.DAPP && primaryNftId) {
      const { tokenId } = await this.nftRepository.getNft({
        where: { id: primaryNftId },
        select: { tokenId: true },
      });
      return tokenId;
    }
    return undefined;
  }

  async cronJobToUpdateEthPrice() {
    try {
      let price: number = await this.cacheManager.get("ETH_PRICE");
      if (!price) {
        const exchangeRates = await this.utilsService.getLatestAmountForUSD([
          "eth",
        ]);
        await this.cacheManager.set("ETH_PRICE", exchangeRates.ETH);
        price = await this.cacheManager.get("ETH_PRICE");
      }
      return price;
    } catch (error) {
      throw error;
    }
  }
}
