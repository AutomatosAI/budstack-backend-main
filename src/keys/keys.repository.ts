import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { MESSAGES } from "src/constants";

@Injectable()
export class KeysRepository {
  constructor(private prismaService: PrismaService) {}

  async validateApiKeyData(userId: string, keyName: string) {
    await this.isExistKeyName(userId, keyName);
    const apiKeys = await this.prismaService.apiKey.findMany({
      where: { userId, keyName, isDelete: false },
    });
    if (apiKeys.length === 100) {
      throw new BadRequestException(MESSAGES.SUCCESS.DAPP.LIMIT_EXCEEDED);
    }
  }

  async isExistKeyName(userId: string, keyName: string) {
    const isExist = await this.prismaService.apiKey.findFirst({
      where: { userId, keyName, isDelete: false },
    });
    if (isExist) {
      throw new BadRequestException(MESSAGES.SUCCESS.DAPP.ALREADY_EXIST);
    }
  }

  async setUserKeys(userId: string, key: string, keyName: string) {
    return await this.prismaService.$transaction([
      this.prismaService.apiKey.create({
        data: {
          keyName,
          key,
          userId,
        },
      }),
    ]);
  }

  async getAllUserKeys(
    userId: string,
    search: string,
    page: number,
    limit: number,
    order: Prisma.SortOrder
  ) {
    // added search functionality
    let searchBy = {};
    if (search) {
      searchBy = { contains: search, mode: "insensitive" };
    }

    // added pagination functionality
    const skip = page ? (page - 1) * limit : undefined;
    limit = limit ? limit : undefined;
    const data = await this.prismaService.$transaction([
      this.prismaService.apiKey.count({
        where: {
          userId,
          isDelete: false,
          keyName: searchBy,
        },
      }),
      this.prismaService.apiKey.findMany({
        where: {
          userId,
          isDelete: false,
          keyName: searchBy,
        },
        orderBy: {
          createdAt: order ? order : Prisma.SortOrder.desc,
        },
        skip: skip,
        take: limit,
      }),
    ]);
    // get the total count of issued credentials, total pages
    const totalCount = data[0];
    const totalPages = Math.ceil(totalCount / limit);
    return {
      data: data[1],
      totalRows: data[1].length,
      totalCount: totalCount,
      totalPages: totalPages ? totalPages : undefined,
      page: page,
    };
  }

  async updateUserKeys(apiKeyId: string, keyName: string) {
    return await this.prismaService.$transaction([
      this.prismaService.apiKey.update({
        where: {
          id: apiKeyId,
        },
        data: {
          keyName,
        },
      }),
    ]);
  }

  async getAPIKeyByUser(userId: string, apiKeyId: string) {
    return await this.prismaService.apiKey.findFirst({
      where: {
        userId,
        id: apiKeyId,
      },
    });
  }

  async softDelete(userId: string, keyId: string) {
    return await this.prismaService.$transaction([
      this.prismaService.apiKey.update({
        where: {
          id: keyId,
          userId,
        },
        data: {
          isDelete: true,
        },
      }),
    ]);
  }
}
