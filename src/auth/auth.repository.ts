import { Injectable, Logger } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { CONSTANT, MESSAGES } from "src/constants";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger();
  async upsertUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserCreateInput;
  }): Promise<User> {
    try {
      const { where, data } = params;
      return await this.prisma.user.upsert({
        where,
        create: data,
        update: data,
      });
    } catch (error) {
      this.logger.error(error);
      if (error.code === CONSTANT.DB_ERROR_CODE.UNIQUE_CONSTRAINT) {
        throw new Error(
          `${MESSAGES.ERROR.UNIQUE_CONSTRAINT} ${error.meta.target.join(",")}`
        );
      }
      throw new Error(MESSAGES.ERROR.USERS.CREATE_FAILED);
    }
  }

  async getUserAssociatedNFTs(userId: string) {
    try {
      const userNfts = await this.prisma.userNftRoleAssociation.findMany({
        where: { userId },
      });
      let nfts: number[] = [];
      userNfts?.forEach((nft) => {
        nfts.push(nft.tokenId);
      });
      return nfts.sort((a, b) => a - b);
    } catch (error) {
      throw error;
    }
  }

  async getUser(params: {
    where: Prisma.UserWhereUniqueInput;
    select?: Prisma.UserSelect;
    include?: Prisma.UserInclude;
  }): Promise<User | any> {
    try {
      return await this.prisma.user.findUnique({ ...params });
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.USERS.FETCH_FAILED);
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    try {
      const { where, data } = params;
      return await this.prisma.user.update({
        where,
        data,
      });
    } catch (error) {
      this.logger.error(error);
      if (error.code === CONSTANT.DB_ERROR_CODE.NOT_FOUND) {
        throw new Error(MESSAGES.ERROR.USERS.NOT_FOUND);
      }
      throw new Error(MESSAGES.ERROR.USERS.CREATE_FAILED);
    }
  }

  // Function to validate the API key
  async validateApiKey(apiKey: string): Promise<boolean> {
    const key = await this.prisma.apiKey.findFirst({
      where: {
        key: apiKey,
        isDelete: false, // Ensure the key is not deleted
      },
    });

    // If the API key exists and is not marked as deleted, return true
    return !!key;
  }

  // Function to get the user associated with the API key
  async getUserByApiKey(apiKey: string): Promise<Partial<User>> {
    return this.prisma.user.findFirst({
      where: {
        apiKeys: {
          some: {
            key: apiKey,
            isDelete: false,
          },
        },
        isActive: true,
      },
      select: {
        id: true,
        walletAddress: true,
        email: true,
        role: true,
        nft: true,
        primaryNftId: true,
        fullName: true,
        username: true,
        commissionPercent: true,
        enable2fa: true,
        isVerified: true,
      },
    });
  }
}
