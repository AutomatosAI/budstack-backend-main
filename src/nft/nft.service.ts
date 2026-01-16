import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { NftRepository } from "./nft.repository";
import {
  updateNftDto,
  getAllNftDto,
  NftIdDto,
  SaleNftDto,
  UpdateNftSaleDto,
  getNftByTokenDto,
  OrderFrom,
} from "./nft.dto";
import { MESSAGES } from "src/constants";
import { AuthRepository } from "src/auth/auth.repository";
import { NftTransactionType, NftType, Prisma } from "@prisma/client";
import { ethers } from "ethers";
import { ConfigService } from "@nestjs/config";
import { configData } from "src/config";
import { abi } from "../../nft-contract-abi";
import { UserRepository } from "src/user/user.repository";
import { CommissionRepository } from "src/commission/commission.repository";
import { GetAllCommissionDto } from "src/commission/commission.dto";
import { CommissionService } from "src/commission/commission.service";
import { STATUS } from "src/user/user.dto";
import { AgentsCommissionSummary } from "src/common/response.dto";

@Injectable()
export class NftService {
  constructor(
    private readonly NftRepository: NftRepository,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly commissionService: CommissionService,
    private readonly commissionRepository: CommissionRepository
  ) {}

  config: any = configData(this.configService);
  private readonly logger = new Logger();

  async getAllNftsList(req) {
    try {
      const { nfts } = await this.userRepository.getUserMintedNFTs({
        where: { ownerId: { not: null } },
        select: { tokenId: true },
        orderBy: { tokenId: Prisma.SortOrder.asc },
      });
      return nfts;
    } catch (error) {
      throw error;
    }
  }

  async getDappSummaryByNftId(tokenId: number) {
    try {
      const { totalClients, totalOrders } =
        await this.userRepository.getUserSummary({
          nftWhereClouse: { tokenId },
          clientWhereClouse: { nft: { tokenId } },
          orderWhereClouse: { nft: { tokenId } },
        });
      return {
        summary: {
          totalClients,
          totalOrders,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllCelebritiesList(req, query) {
    try {
      const { search } = query;
      return await this.userRepository.getAllUsersList({
        where: {
          nft: {
            some: {
              nftMetadata: {
                nftType: { in: [NftType.Gold, NftType.Platinum] },
              },
              ownerId: { not: null },
            },
          },
          OR: search
            ? [
                { fullName: { contains: search, mode: "insensitive" } },
                { username: { contains: search, mode: "insensitive" } },
              ]
            : undefined,
        },
        select: {
          id: true,
          fullName: true,
          username: true,
          walletAddress: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async GetTokenDetailsWithOwnersHistory(req, tokenId: number) {
    try {
      const nft: any = await this.NftRepository.getNft({
        where: {
          tokenId,
          ownerId: { not: null },
        },
        select: {
          id: true,
          tokenId: true,
          price: true,
          metadataId: true,
          mintedAt: true,
          isListedForSale: true,
          ownerId: true,
          updatedAt: true,
          owner: {
            select: {
              walletAddress: true,
              profileUrl: true,
              id: true,
            },
          },
          nftMetadata: {
            select: {
              metadataId: true,
              nftType: true,
              nftName: true,
              clientCount: true,
              txCount: true,
              txVolume: true,
              imageUrl: true,
              description: true,
            },
          },
          nftTransactions: {
            where: {
              tokenId,
              type: { in: ["MINT", "TRANSFER"] },
            },
            select: {
              from: true,
              to: true,
              timestamp: true,
              nft: {
                select: {
                  id: true,
                  clients: {
                    select: {
                      id: true,
                      createdAt: true,
                    },
                  },
                  orders: {
                    select: {
                      id: true,
                      createdAt: true,
                    },
                  },
                },
              },
            },
            orderBy: {
              timestamp: "asc",
            },
          },
        },
      });
      if (!nft) {
        throw new NotFoundException(MESSAGES.ERROR.NFT.NOT_FOUND);
      }
      const contractDetails = await this.NftRepository.getContractDetails(
        this.config.NFT_CONTRACT_ID
      );
      // Check if metadataId exists and fetch additional data
      if (nft.nftMetadata && nft.nftMetadata.metadataId) {
        const metadataId = nft.nftMetadata.metadataId;
        const response: any = await this.NftRepository.getNftStrains(
          nft.tokenId,
          nft.nftMetadata.nftType
        );

        const data = [
          ...response.attributes?.slice(0, 2),
          { trait_type: "CLIENT COUNT", value: nft.nftMetadata.clientCount },
          { trait_type: "TX COUNT", value: nft.nftMetadata.txCount },
          {
            trait_type: "TX VOLUME",
            value: `${nft.nftMetadata.txVolume ? nft.nftMetadata.txVolume : 0} $`,
          },
          ...response.attributes?.slice(2),
        ];

        const nftMetadata = {
          internal: nft.nftMetadata,
          external: { attributes: data },
        };
        // Add the external metadata to the NFT object
        nft.nftMetadata = nftMetadata;
      }
      const ownershipDetails = nft.nftTransactions.map((transaction, index) => {
        const nextTransaction = nft.nftTransactions[index + 1];

        const startTime = transaction.timestamp;
        const endTime = nextTransaction
          ? nextTransaction.timestamp
          : new Date();

        const totalClients = transaction.nft.clients.filter((client) => {
          return client.createdAt >= startTime && client.createdAt < endTime;
        }).length;

        const totalOrders = transaction.nft.orders.filter((order) => {
          return order.createdAt >= startTime && order.createdAt < endTime;
        }).length;

        return {
          walletAddress: transaction.to,
          endTime,
          totalClients,
          totalOrders,
        };
      });
      nft.ownershipHistory = ownershipDetails;
      const { nftTransactions, ...nftDetails } = nft;
      return { ...nftDetails, ...contractDetails };
    } catch (error) {
      throw error;
    }
  }

  async getHolderByNftId(tokenId: number) {
    try {
      return await this.NftRepository.getHolderByNftId(tokenId);
    } catch (error) {
      throw error;
    }
  }

  async countMintedNfts(): Promise<number> {
    try {
      return await this.NftRepository.countMintedNfts();
    } catch (error) {
      this.logger.error(`Error counting minted NFTs: ${error.message}`);
      throw new Error("Failed to count minted NFTs");
    }
  }

  async countNftsPerPlanet(): Promise<any> {
    try {
      return await this.NftRepository.countNftsPerPlanet();
    } catch (error) {
      this.logger.error(`Error counting minted NFTs: ${error.message}`);
      throw new Error("Failed to count minted NFTs");
    }
  }

  async getCommissionSummary(
    req,
    tokenId: number,
    userId: string,
    agentStatus: STATUS
  ): Promise<AgentsCommissionSummary> {
    try {
      const nft = await this.NftRepository.getNft({
        where: { tokenId },
        select: { id: true, tokenId: true },
      });
      if (userId) {
        return await this.commissionRepository.getCommissionSummary(
          nft.id,
          true,
          userId,
          agentStatus
        );
      } else {
        return await this.commissionRepository.getCommissionSummary(
          nft.id,
          false,
          undefined,
          agentStatus
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async getHolderCommissionsByNftId(
    req,
    tokenId: number,
    query: GetAllCommissionDto
  ): Promise<{ commissions: any[]; paginationCount: number }> {
    try {
      const user = await this.NftRepository.getHolderByNftId(tokenId);
      return await this.commissionService.getAllCommissions(
        query,
        tokenId,
        user
      );
    } catch (error) {
      throw error;
    }
  }

  async getManagerCommissionsByNftId(
    req,
    tokenId: number,
    userId: string,
    query: GetAllCommissionDto
  ): Promise<{ commissions: any[]; paginationCount: number }> {
    try {
      const user = await this.userRepository.getUserDetails({ id: userId });
      return await this.commissionService.getAllCommissions(
        query,
        tokenId,
        user
      );
    } catch (error) {
      throw error;
    }
  }
}
