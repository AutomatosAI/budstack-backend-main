import { Injectable, Logger } from "@nestjs/common";
import {
  AdminApprovalOnOrder,
  OrderStatus,
  PaymentStatus,
  Prisma,
  Role,
  User,
} from "@prisma/client";
import { CONSTANT, MESSAGES } from "src/constants";
import { PrismaService } from "src/prisma/prisma.service";
import { STATUS } from "./user.dto";

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) { }
  private readonly logger = new Logger();

  async getSummary(params: { where?: Prisma.UserWhereInput }) {
    try {
      const [activeCount, inActiveCount] = await this.prisma.$transaction([
        this.prisma.user.count({ where: { isActive: true, ...params.where } }),
        this.prisma.user.count({
          where: { isActive: false, ...params.where },
        }),
      ]);
      return {
        summary: {
          totalCount: activeCount + inActiveCount,
          activeCount,
          inActiveCount,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async getWhitelistedSummary() {
    try {
      const totalWhitelistedUsers = await this.prisma.whitelistedUsers.count();
      const { totalGoldLimits, totalPlatinumLimits, totalStandardLimits } =
        await this.getWhitelistedNftLimits();
      const { totalGoldMinted, totalPlatinumMinted, totalStandardMinted } =
        await this.getTotalMintedNFTs();
      return {
        summary: {
          totalWhitelistedUsers,
          totalGoldLimits,
          totalGoldMinted,
          totalPlatinumLimits,
          totalPlatinumMinted,
          totalStandardLimits,
          totalStandardMinted,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async getWhitelistedNftLimits() {
    try {
      const [goldLimits, platinumLimits, standardLimits] =
        await this.prisma.$transaction([
          this.prisma.whitelistedUsers.aggregate({
            _sum: {
              goldLimit: true,
            },
          }),
          this.prisma.whitelistedUsers.aggregate({
            _sum: {
              platinumLimit: true,
            },
          }),
          this.prisma.whitelistedUsers.aggregate({
            _sum: {
              standardLimit: true,
            },
          }),
        ]);
      return {
        totalGoldLimits: goldLimits._sum.goldLimit || 0,
        totalPlatinumLimits: platinumLimits._sum.platinumLimit || 0,
        totalStandardLimits: standardLimits._sum.standardLimit || 0,
      };
    } catch (error) {
      throw error;
    }
  }

  async getTotalMintedNFTs() {
    try {
      const [goldMinted, platinumMinted, standardMinted] =
        await this.prisma.$transaction([
          this.prisma.whitelistedUsers.aggregate({
            _sum: {
              goldMinted: true,
            },
          }),
          this.prisma.whitelistedUsers.aggregate({
            _sum: {
              platinumMinted: true,
            },
          }),
          this.prisma.whitelistedUsers.aggregate({
            _sum: {
              standardMinted: true,
            },
          }),
        ]);
      return {
        totalGoldMinted: goldMinted._sum.goldMinted || 0,
        totalPlatinumMinted: platinumMinted._sum.platinumMinted || 0,
        totalStandardMinted: standardMinted._sum.standardMinted || 0,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateUser(params: {
    where?: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUncheckedUpdateInput;
    select?: Prisma.UserSelect;
  }): Promise<User> {
    try {
      const { where, data } = params;
      return await this.prisma.user.update({ where, data });
    } catch (error) {
      this.logger.error(error);
      if (error.code === CONSTANT.DB_ERROR_CODE.UNIQUE_CONSTRAINT) {
        throw new Error(`${error.meta.target.join(",")} is already taken`);
      }
      throw new Error(MESSAGES.ERROR.USERS.UPDATE_FAILED);
    }
  }

  async updateHolderCommission(
    orderId: string,
    ownerId: string,
    totalProfit: number,
    deductAmount: number,
    incrementAmount: number
  ) {
    try {
      const data: Prisma.CommissionsUpdateInput = {};
      if (deductAmount > 0) {
        data.amountInDollar = {
          decrement: deductAmount,
        };
      }
      if (incrementAmount > 0) {
        data.amountInDollar = {
          increment: incrementAmount,
        };
      }
      const user = await this.prisma.commissions.findFirst({
        where: {
          orderId,
          user: { role: Role.USER },
          paymentStatus: PaymentStatus.PENDING,
        },
      });
      if (user) {
        return await this.prisma.commissions.update({
          where: { id: user.id },
          data: data,
        });
      } else {
        return await this.prisma.commissions.create({
          data: {
            order: { connect: { id: orderId } },
            user: { connect: { walletAddress: ownerId } },
            paymentStatus: PaymentStatus.PENDING,
            amountInDollar: totalProfit - deductAmount + incrementAmount,
          },
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async createUser(data: Prisma.UserCreateInput) {
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      throw error;
    }
  }

  async createWhitelistedUser(data: Prisma.WhitelistedUsersCreateInput) {
    try {
      return await this.prisma.whitelistedUsers.create({ data });
    } catch (error) {
      throw error;
    }
  }

  async getAllOrdersForCommission(tokenId: number) {
    try {
      const orders = await this.prisma.order.findMany({
        where: {
          nft: { tokenId },
          adminApproval: AdminApprovalOnOrder.VERIFIED,
          commissionPaid: false,
          paymentStatus: PaymentStatus.PAID,
        },
        select: {
          id: true,
          totalAmount: true,
          agentProfit: true,
          nft: { select: { ownerId: true } },
        },
      });
      return orders;
    } catch (error) {
      throw error;
    }
  }

  async getUserPermission(where: Prisma.UserPermissionsWhereInput) {
    try {
      const user = await this.prisma.userPermissions.findFirst({
        where,
      });
      if (user) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  async getUserPermissions(where: Prisma.UserPermissionsWhereInput) {
    try {
      const user = await this.prisma.userPermissions.findMany({
        where,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async isUserExist(params: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<number> {
    try {
      return await this.prisma.user.count({ ...params });
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.USERS.FETCH_FAILED);
    }
  }

  async getAllUsersList(params: {
    where?: Prisma.UserWhereInput;
    select?: Prisma.UserSelect;
  }) {
    try {
      const users = await this.prisma.user.findMany({ ...params });
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(
    role: Role,
    tokenId: number,
    agentStatus: STATUS,
    isWhitelisted: boolean,
    byStatus: STATUS,
    search: string,
    skip: number,
    take: number,
    orderBy: Prisma.SortOrder
  ): Promise<{ users: any[]; count: number }> {
    try {
      const fetchUsers = async (skipCount: number, takeCount: number) => {
        if (isWhitelisted) {
          return await this.getWhitelistedUsers(search, skipCount, takeCount, orderBy);
        } else {
          return await this.getUsersWithCommissions(
            tokenId,
            role,
            agentStatus,
            byStatus,
            search,
            skipCount,
            takeCount,
            orderBy
          );
        }
      };
  
      if (take > 500) {
        const users: any[] = [];
        let totalUsers = 0;
        let skipCount = 0;
        let takeCount = 500;
        let result: { users: any[]; count: number };
  
        do {
          result = await fetchUsers(skipCount, takeCount);
          users.push(...result.users);
          totalUsers += result.users.length;
          skipCount += takeCount;
          takeCount = Math.min(500, take - totalUsers);
        } while (totalUsers < take && totalUsers < result.count);
  
        return { users, count: result.count };
      } else {
        return await fetchUsers(skip, take);
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.USERS.FETCH_FAILED);
    }
  }
  private async getWhitelistedUsers(
    search: string,
    skip: number,
    take: number,
    orderBy: Prisma.SortOrder
  ): Promise<{ users: any, count: number }> {
    const where: Prisma.WhitelistedUsersWhereInput = {};
    if (search) {
      where.walletAddress = {
        contains: search,
        mode: "insensitive",
      };
    }

    const [users, count] = await this.prisma.$transaction([
      this.prisma.whitelistedUsers.findMany({
        where,
        select: {
          walletAddress: true,
         
          standardLimit: true,
          standardMinted: true,
          createdAt: true,
        },
        skip,
        take,
        orderBy: {
          createdAt: orderBy || Prisma.SortOrder.desc,
        },
      }),
      this.prisma.whitelistedUsers.count({ where }),
    ]);

    return { users, count };
  }

  async getUsersWithCommissions(
    tokenId: number,
    role: Role,
    agentStatus: STATUS,
    byStatus: STATUS,
    search: string,
    skip: number,
    take: number,
    orderBy: Prisma.SortOrder
  ): Promise<{ users: any; count: number }> {

    const CHUNK_SIZE = 500;
    const { where, conditionString } = this.buildWhereClauseAndConditionString(
      tokenId,
      role,
      byStatus,
      search,
      agentStatus
    );

    if (take &&  take > CHUNK_SIZE) {
      const usersWithCommission: any[] = [];
      let skipCount = skip;
      let remaining = take;

      while (remaining > 0) {
        const chunkTake = Math.min(CHUNK_SIZE, remaining);
        const chunkUsers = await this.fetchUsersWithCommissionsChunk({
          conditionString,
          orderBy,
          take: chunkTake,
          skip: skipCount,
        });

        if (chunkUsers.length === 0) {
          break; // No more data to fetch
        }

        usersWithCommission.push(...chunkUsers);
        skipCount += chunkTake;
        remaining -= chunkTake;
      }

      const count = await this.prisma.user.count({ where });
      return { users: usersWithCommission, count };
    }

    
    const usersWithCommission = await this.fetchUsersWithCommissionsChunk({
      conditionString,
      orderBy,
      take,
      skip,
    });

    const count = await this.prisma.user.count({ where });
    return { users: usersWithCommission, count };

   
  }

  async fetchUsersWithCommissionsChunk(params: {
    conditionString: string;
    orderBy: Prisma.SortOrder;
    take: number;
    skip: number;
  }): Promise<any[]> {
    const { conditionString, orderBy, take, skip } = params;
    return await this.prisma.$queryRawUnsafe(`
      SELECT
      "User"."id",
      "User"."fullName",
      "User"."username",
      "User"."email",
      "User"."phoneCode",
      "User"."phoneNumber",
      "User"."isActive",
      "User"."createdAt",
      "User"."updatedAt",
      "User"."walletAddress",
      "User"."commissionPercent", 
      SUM(CASE WHEN "Commissions"."paymentStatus" = 'PENDING' THEN "Commissions"."amountInDollar" ELSE 0 END) AS "totalPendingCommission",
      SUM(CASE WHEN "Commissions"."paymentStatus" = 'PAID' THEN "Commissions"."amountInDollar" ELSE 0 END) AS "totalPaidCommission"
      FROM
        "User"
      LEFT JOIN
          "Commissions" ON "User"."id" = "Commissions"."userId"
      LEFT JOIN
          "Order" ON "Commissions"."orderId" = "Order"."id"
      LEFT JOIN
          "Nft" ON "Order"."nftId" = "Nft"."id"
      ${conditionString}
      GROUP BY
        "User"."id"
      ORDER BY
        "User"."createdAt" ${orderBy || "desc"}
      LIMIT
        ${take}
      OFFSET
        ${skip}
    `);

  }
  

  private buildWhereClauseAndConditionString(
    tokenId: number,
    role: Role,
    byStatus: STATUS,
    search: string,
    agentStatus: STATUS
  ): {
    where: Prisma.UserWhereInput;
    conditionString: string;
  } {
    let conditionString = "";
    let where: Prisma.UserWhereInput = {};

    if (role == Role.MANAGER) {
      conditionString += `LEFT JOIN "UserNftRoleAssociation" ON "User"."id" = "UserNftRoleAssociation"."userId" AND "UserNftRoleAssociation"."tokenId" = "Nft"."tokenId" 
                          WHERE "User"."role" = 'MANAGER'`;
      if (agentStatus == STATUS.ACTIVE) {
        conditionString += ` AND "UserNftRoleAssociation"."id" IS NOT NULL`;
        where = {
          role,
          UserNftRoleAssociation: {
            some: { tokenId },
          },
        };
      } else if (agentStatus == STATUS.INACTIVE) {
        conditionString += ` AND ("UserNftRoleAssociation"."id" IS NULL OR "UserNftRoleAssociation"."id" IS NULL AND "Commissions"."userId" = "User"."id")`;
        where = {
          role,
          UserNftRoleAssociation: {
            every: { tokenId: { notIn: [tokenId] } },
          },
          commission: {
            some: { order: { nft: { tokenId: tokenId } } },
          },
        };
      } else {
        conditionString += ` AND ("UserNftRoleAssociation"."id" IS NOT NULL OR "UserNftRoleAssociation"."id" IS NULL)`;
        where = {
          role,
          OR: [
            {
              UserNftRoleAssociation: {
                some: { tokenId },
              },
            },
            {
              UserNftRoleAssociation: {
                every: { tokenId: { notIn: [tokenId] } },
              },
              commission: {
                some: { order: { nft: { tokenId: tokenId } } },
              },
            },
          ],
        };
      }
    } else if (role == Role.USER) {
      conditionString += `WHERE "User"."role" = 'USER' AND EXISTS (SELECT 1 FROM "Nft" WHERE "Nft"."ownerId" = "User"."walletAddress")`;
      where = { role, nft: { some: {} } };
    } else {
      conditionString += `WHERE "User"."role" = '${role}'`;
      where = {
        role,
      };
    }

    if (byStatus) {
      conditionString += ` AND "User"."isActive" = ${byStatus === STATUS.ACTIVE}`;
      where = { isActive: byStatus === STATUS.ACTIVE };
    }

    if (tokenId) {
      conditionString += ` AND "Nft"."tokenId" = ${tokenId}`;
    }

    if (search) {
      conditionString += ` AND (
        "User"."fullName" ILIKE '%${search}%' OR
        "User"."username" ILIKE '%${search}%' OR
        "User"."email" ILIKE '%${search}%' OR
        "User"."walletAddress" ILIKE '%${search}%'
      )`;
      where = {
        OR: [
          { fullName: { contains: search, mode: "insensitive" } },
          { username: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { walletAddress: { contains: search, mode: "insensitive" } },
        ],
      };
    }

    return { where, conditionString };
  }

  async getUserDetails(where: Prisma.UserWhereUniqueInput) {
    try {
      const user = await this.prisma.user.findUnique({
        where,
        select: {
          id: true,
          fullName: true,
          username: true,
          email: true,
          walletAddress: true,
          role: true,
          phoneCountryCode: true,
          phoneCode: true,
          phoneNumber: true,
          createdAt: true,
          isActive: true,
          commissionPercent: true,
          nft: { select: { tokenId: true } },
          _count: {
            select: { UserNftRoleAssociation: { where: { user: where } } },
          },
          UserNftRoleAssociation: { select: { tokenId: true } },
          userPermission: {
            select: { permission: true, write: true, read: true },
          },
        },
      });
      if (user) {
        const mintedNFTs = user.nft.length;
        const { nft, ...userData } = user;
        return { ...userData, mintedNFTs };
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async getUserSummary(params: {
    nftWhereClouse?: Prisma.NftWhereInput;
    clientWhereClouse?: Prisma.ClientWhereInput;
    orderWhereClouse?: Prisma.OrderWhereInput;
  }) {
    try {
      const [totalNfts, totalClients, totalOrders] =
        await this.prisma.$transaction([
          this.prisma.nft.count({ where: params.nftWhereClouse }),
          this.prisma.client.count({
            where: params.clientWhereClouse,
          }),
          this.prisma.order.count({
            where: params.orderWhereClouse,
          }),
        ]);
      return {
        totalNfts,
        totalClients,
        totalOrders,
      };
    } catch (error) {
      throw error;
    }
  }

  async getWhitelistedUser(walletAddress: string) {
    try {
      return await this.prisma.whitelistedUsers.findUnique({
        where: { walletAddress },
        select: {
          walletAddress: true,
          goldLimit: true,
          goldMinted: true,
          platinumLimit: true,
          platinumMinted: true,
          standardLimit: true,
          standardMinted: true,
          createdAt: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async removeWhitelistedUser(walletAddress: string) {
    try {
      return await this.prisma.whitelistedUsers.delete({
        where: { walletAddress },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateWhitelistedUser(
    walletAddress: string,
    data: Prisma.WhitelistedUsersUpdateInput
  ) {
    try {
      return await this.prisma.whitelistedUsers.update({
        where: { walletAddress },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserAssociatedNFTsWithDetails(userId: string) {
    try {
      const userNftRoleAssociationData =
        await this.prisma.userNftRoleAssociation.findMany({
          where: {
            userId: userId,
          },
          select: {
            userId: true,
            nft: {
              select: {
                tokenId: true,
                _count: {
                  select: {
                    clients: true,
                    orders: true,
                  },
                },
                owner: {
                  select: {
                    fullName: true,
                    email: true,
                  },
                },
              },
            },
            createdAt: true,
          },
        });
      // Flatten the nested data structure and transform it if needed
      const flattenedData = userNftRoleAssociationData.map((item) => ({
        userId: item.userId,
        tokenId: item.nft.tokenId,
        totalClients: item.nft._count.clients,
        totalOrders: item.nft._count.orders,
        nftHolderName: item.nft.owner.fullName,
        email: item.nft.owner.email,
        createdAt: item.createdAt,
      }));
      return {
        associatedNfts: flattenedData,
        count: userNftRoleAssociationData.length,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllNftsByCelebrityIds(params: {
    where?: Prisma.NftWhereInput;
    select?: Prisma.NftSelect;
  }) {
    try {
      return await this.prisma.nft.findMany({ ...params });
    } catch (error) {
      throw error;
    }
  }

  async getAllCelebritiesOrAssociatedNFTs(params: {
    where?: Prisma.UserNftRoleAssociationWhereInput;
    select?: Prisma.UserNftRoleAssociationSelect;
    include?: Prisma.UserNftRoleAssociationInclude;
    orderBy?: Prisma.UserNftRoleAssociationOrderByWithRelationInput;
    take?: number;
    skip?: number;
  }) {
    try {
      const { where } = params;
      const [data, count] = await this.prisma.$transaction([
        this.prisma.userNftRoleAssociation.findMany({ ...params }),
        this.prisma.userNftRoleAssociation.count({
          where,
        }),
      ]);
      return {
        data,
        count,
      };
    } catch (error) {
      throw error;
    }
  }

  async getUserMintedNFTs(params: {
    where?: Prisma.NftWhereInput;
    select?: Prisma.NftSelect;
    take?: number;
    skip?: number;
    orderBy?: Prisma.NftOrderByWithAggregationInput;
  }) {
    try {
      const { where } = params;
      const [nfts, count] = await this.prisma.$transaction([
        this.prisma.nft.findMany({ ...params }),
        this.prisma.nft.count({
          where,
        }),
      ]);
      return { nfts, count };
    } catch (error) {
      throw error;
    }
  }

  async iSNftAssociated(userId: string, tokenId: number) {
    try {
      return await this.prisma.userNftRoleAssociation.findFirst({
        where: { userId, tokenId },
      });
    } catch (error) {
      throw error;
    }
  }
  async getUserWalletProof(walletAddress: string) {
    try {
      return await this.prisma.walletProof.findFirst({
        where: {
          walletAddress: {
            equals: walletAddress,
            mode: 'insensitive',
          }
        },
        select: {
          proof: true
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
