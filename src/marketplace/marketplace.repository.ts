import { Injectable, Logger } from "@nestjs/common";
import {
  Contracts,
  Nft,
  NftSale,
  NftType,
  Prisma,
  WhitelistedUsers,
} from "@prisma/client";
import { CONSTANT, MESSAGES } from "src/constants";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class MarketPlaceRepository {
  constructor(private prisma: PrismaService) { }
  private readonly logger = new Logger();

  async getPlanetDetailByPlanetId(params: {
    where: Prisma.PlanetDetailWhereUniqueInput;
    select?: Prisma.PlanetDetailSelect;
  }): Promise<any> {
    try {
      const { where, select } = params;
      return await this.prisma.planetDetail.findUnique({
        where,
        select,
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.CLIENT.FETCH_FAILED);
    }
  }

  async getAllNfts(params: {
    where?: Prisma.NftWhereInput;
    select?: Prisma.NftSelect;
    include?: Prisma.NftInclude;
    orderBy?: Prisma.NftOrderByWithAggregationInput;
    take?: number;
    skip?: number;
  }): Promise<{ nfts: Nft[]; count: number }> {
    try {
      const { where } = params;
      const [nfts, count] = await this.prisma.$transaction([
        this.prisma.nft.findMany({ ...params }),
        this.prisma.nft.count({
          where,
        }),
      ]);
      return {
        nfts,
        count,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.NFT.FETCH_FAILED);
    }
  }

  async OnSaleNft(params: {
    saleData: Prisma.NftSaleUncheckedCreateInput;
    nftTransactionData: Prisma.NftTransactionsUncheckedCreateInput;
  }) {
    try {
      const [nftSale, nftTransactions, nft] = await this.prisma.$transaction([
        this.prisma.nftSale.create({ data: params.saleData }),
        this.prisma.nftTransactions.create({ data: params.nftTransactionData }),
        this.prisma.nft.update({
          where: {
            tokenId: params.saleData.tokenId,
          },
          data: {
            isListedForSale: true,
          },
        }),
      ]);
      return {
        nftSale,
        nftTransactions,
        nft,
      };
    } catch (error) {
      this.logger.error("Error fetching planet detail:", error);
      throw new Error(MESSAGES.ERROR.NFT.SALE_ERROR);
    }
  }

  async UpdateNftSale(params: {
    whereSale: Prisma.NftSaleWhereUniqueInput;
    updateSale: Prisma.NftSaleUncheckedUpdateInput;
    nftTransactionData: Prisma.NftTransactionsUncheckedCreateInput;
  }) {
    try {
      const [updateSale, nftTransactions, nft] = await this.prisma.$transaction(
        [
          this.prisma.nftSale.update({
            where: params.whereSale,
            data: params.updateSale,
          }),
          this.prisma.nftTransactions.create({
            data: params.nftTransactionData,
          }),
          this.prisma.nft.update({
            where: {
              tokenId: params.nftTransactionData.tokenId,
            },
            data: {
              isListedForSale: false,
            },
          }),
        ]
      );
      return {
        updateSale,
        nftTransactions,
        nft,
      };
    } catch (error) {
      this.logger.error("Error fetching planet detail:", error);
      throw new Error(MESSAGES.ERROR.NFT.NOT_SALE_ERROR);
    }
  }

  async getNftSale(params: {
    where: Prisma.NftSaleWhereUniqueInput;
    include?: Prisma.NftSaleInclude;
    select?: Prisma.NftSaleSelect;
  }): Promise<NftSale> {
    try {
      return await this.prisma.nftSale.findUnique({ ...params });
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.NFT.ON_SALE_NOT_FOUND);
    }
  }

  async getManyNftSale(params: {
    where?: Prisma.NftSaleWhereInput;
    select?: Prisma.NftSaleSelect;
    orderBy?: Prisma.NftSaleOrderByWithAggregationInput;
    take?: number;
    skip?: number;
  }) {
    try {
      return await this.prisma.nftSale.findMany({ ...params });
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.NFT.SALE_FETCH_FAILED);
    }
  }

  async getContractByContractId(params: {
    where: Prisma.ContractsWhereInput;
    select?: Prisma.ContractsSelect;
  }): Promise<Contracts> {
    try {
      return await this.prisma.contracts.findFirst({ ...params });
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.NFT.FETCH_FAILED);
    }
  }

  async getAllTransaction(params: {
    where?: Prisma.NftTransactionsWhereInput;
    include?: Prisma.NftTransactionsInclude;
    select?: Prisma.NftTransactionsSelect;
    orderBy?: Prisma.NftTransactionsOrderByWithAggregationInput;
    take?: number;
    skip?: number;
  }): Promise<{ transactions: any[]; count: number }> {
    try {
      const { where } = params;
      const [transactions, count] = await this.prisma.$transaction([
        this.prisma.nftTransactions.findMany({ ...params }),
        this.prisma.nftTransactions.count({
          where,
        }),
      ]);
      return {
        transactions,
        count,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.TRANSACTION.FETCH_FAILED);
    }
  }

  async getWhitelistedAddressByWalletAddress(params: {
    where: Prisma.WhitelistedUsersWhereInput;
    select?: Prisma.WhitelistedUsersSelect;
  }): Promise<WhitelistedUsers> {
    try {
      return await this.prisma.whitelistedUsers.findFirst({ ...params });
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.WHITELISTEDUSERS.FETCH_FAILED);
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

  async getTotalMintedNFTsByType(nftType: NftType): Promise<number> {
    try {
      const mintedCount = await this.prisma.nftMetadata.count({
        where: { nftType, tokenId: { not: null } },
      });
      return mintedCount;
    } catch (error) {
      throw error;
    }
  }

  async getMintedPlanetCount(): Promise<any[]> {
    try {
      return await this.prisma.$queryRaw`
        SELECT pdnm."planetDetailId", COUNT(*) AS count
        FROM "PlanetDetailNftMetadata" pdnm
        JOIN "NftMetadata" nm ON pdnm."metadataId" = nm."metadataId"
        JOIN "Nft" n ON nm."metadataId" = n."metadataId"
        WHERE n."mintedAt" IS NOT NULL AND n."ownerId" IS NOT NULL AND n."metadataId" >= ${CONSTANT.STANDARD_START_INDEX}
        GROUP BY pdnm."planetDetailId";
      `;
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.NFT.MINTING_COUNT);
    }
  }
}
