import { Injectable, Logger } from "@nestjs/common";
import { TransactionRepository } from "./transaction.repository";
import { Prisma, TransactionStatus, User } from "@prisma/client";
import {
  GetAllTransactionByClientDto,
  GetAllTransactionDto,
} from "./transaction.dto";

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}
  private readonly logger = new Logger();

  async GetAllTransactionsByNftId(
    req,
    query: GetAllTransactionDto,
    tokenId: number
  ) {
    try {
      const { primaryNftId } = req.user;
      const { status, search, orderBy, page, take, skip } = query;
      const where: Prisma.TransactionWhereInput = {};
      if (tokenId) {
        where.order = {
          nft: { tokenId },
        };
      } else {
        where.order = {
          nftId: primaryNftId,
        };
      }
      if (status) {
        where.status = status;
      }
      if (search) {
        where.OR = [
          {
            method: {
              equals: "DEBIT" || "CREDIT",
            },
          },
          {
            invoice: {
              contains: search,
              mode: "insensitive",
            },
          },
        ];
      }
      const { transactions, count } =
        await this.transactionRepository.getAllTransaction({
          where,
          select: {
            id: true,
            description: true,
            method: true,
            amount: true,
            invoice: true,
            status: true,
            destination: true,
            createdAt: true,
          },
          orderBy: { createdAt: orderBy ? orderBy : Prisma.SortOrder.desc },
          take: take,
          skip: skip
        });
      return {
        transactions,
        paginationCount: count,
      };
    } catch (error) {
      throw error;
    }
  }

  async getTransactionByClient(
    clientId: string,
    query: GetAllTransactionByClientDto,
    user: User
  ) {
    try {
      const { transactions, count } =
        await this.transactionRepository.getAllTransaction({
          where: {
            clientId,
            ...query,
          },
          select: {
            id: true,
            description: true,
            method: true,
            amount: true,
            invoice: true,
            status: true,
            destination: true,
            createdAt: true,
          },
          orderBy: { createdAt: Prisma.SortOrder.desc },
        });

      return {
        transactions,
        paginationCount: count,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
