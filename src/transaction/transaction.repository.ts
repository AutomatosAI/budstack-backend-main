import { Injectable, Logger } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { MESSAGES } from "src/constants";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TransactionRepository {
    constructor(private prisma: PrismaService) {}
    private readonly logger = new Logger();


    async getAllTransaction(params: {
      where?: Prisma.TransactionWhereInput;
      include?: Prisma.TransactionInclude;
      select?: Prisma.TransactionSelect;
      orderBy?: Prisma.TransactionOrderByWithAggregationInput;
      take?: number;
      skip?: number;
    }): Promise<{ transactions: any[]; count: number }> {
      try {
        const CHUNK_SIZE = 500; 
        const { where, take } = params;
    
      
        if (take && take > CHUNK_SIZE) {
          const transactions: any[] = [];
          let skipCount = params.skip || 0;
          let remaining = take;
    
          while (remaining > 0) {
            const chunkTake = Math.min(CHUNK_SIZE, remaining);
            const chunkTransactions = await this.prisma.transaction.findMany({
              ...params,
              skip: skipCount,
              take: chunkTake,
            });
    
            if (chunkTransactions.length === 0) {
              break; // No more data to fetch
            }
    
            transactions.push(...chunkTransactions);
            skipCount += chunkTake;
            remaining -= chunkTake;
          }
    
          const count = await this.prisma.transaction.count({ where });
          return { transactions, count };
        }
    
        const [transactions, count] = await this.prisma.$transaction([
          this.prisma.transaction.findMany({ ...params }),
          this.prisma.transaction.count({ where }),
        ]);
    
        return { transactions, count };
      } catch (error) {
        this.logger.error(error);
        throw new Error(MESSAGES.ERROR.TRANSACTION.FETCH_FAILED);
      }
    }
}