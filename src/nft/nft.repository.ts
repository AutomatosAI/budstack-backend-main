import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { Nft, NftSale, NftType, Prisma } from "@prisma/client";
import { CONSTANT, MESSAGES } from "src/constants";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class NftRepository {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger();

  async getNft(params: {
    where: Prisma.NftWhereUniqueInput;
    select?: Prisma.NftSelect;
    include?: Prisma.NftInclude;
  }): Promise<Nft> {
    try {
      return await this.prisma.nft.findUnique({ ...params });
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.NFT.FETCH_FAILED);
    }
  }

  async getNftStrains(nftId: number, nftType: NftType) {
    try {
      if (nftType === NftType.Standard) {
        const strains = await this.prisma.planetDetailNftMetadata.findFirst({
          where: { nftMetadata: { tokenId: nftId, nftType } },
          select: {
            planetDetail: {
              select: {
                planetNo: true,
                name: true,
                strains: { select: { strain: { select: { name: true } } } },
              },
            },
          },
        });
        const data = [];
        strains.planetDetail.strains.forEach((strain) => {
          data.push({ name: strain.strain.name });
        });
        data.unshift({
          trait_type: CONSTANT.TRAIT_TYPES.NFT_TYPE,
          value: strains.planetDetail.name,
        });
        data.unshift({
          trait_type: CONSTANT.TRAIT_TYPES.KEY_TYPE,
          value: nftType,
        });
        return {
          attributes: data,
        };
      } else {
        const strains: any = await this.prisma.strain.findMany({
          select: { name: true },
        });
        strains.unshift({
          trait_type: CONSTANT.TRAIT_TYPES.PLANET_NAME,
          value: "All",
        });
        strains.unshift({
          trait_type: CONSTANT.TRAIT_TYPES.KEY_TYPE,
          value: nftType,
        });
        return { attributes: strains };
      }
    } catch (error) {
      throw error;
    }
  }

  async getContractDetails(nftAddress: string) {
    try {
      return await this.prisma.contracts.findUnique({
        where: { address: nftAddress },
        select: {
          address: true,
          contractName: true,
          blockchainType: true,
          chainName: true,
          chainId: true,
          tokenStandard: true,
          royaltyFee: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getNftOwnershipHistory(tokenId: number) {
    const ownershipHistory = await this.prisma.nftTransactions.findMany({
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
        timestamp: Prisma.SortOrder.asc,
      },
    });

    // Step 2: Process the ownership history to calculate total clients and total orders during each ownership period
    const ownershipDetails = ownershipHistory.map((transaction, index) => {
      const nextTransaction = ownershipHistory[index + 1];

      const startTime = transaction.timestamp;
      const endTime = nextTransaction ? nextTransaction.timestamp : new Date();

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
    return ownershipDetails;
  }

  async getHolderByNftId(tokenId: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { nft: { some: { tokenId } } },
        select: {
          id: true,
          fullName: true,
          username: true,
          email: true,
          walletAddress: true,
          phoneCountryCode: true,
          phoneCode: true,
          phoneNumber: true,
          isActive: true,
        },
      });
      if(!user) {
        throw new BadRequestException(MESSAGES.ERROR.NFT.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getPlanetDetail(planetDetailId) {
    try {
      const planetDetail = await this.prisma.planetDetail.findUnique({
        where: { planetNo: planetDetailId },
        include: {
          strains: true, // Assuming you want to include related strains
          nftMetadatas: true, // Include related NFT metadata if needed
        },
      });

      return planetDetail;
    } catch (error) {
      console.error("Error fetching planet detail:", error);
      throw error;
    }
  }

  async countMintedNfts(): Promise<number> {
    return this.prisma.nft.count({
      where: {
        metadataId: { not: null },
        ownerId: { not: null },
      },
    });
  }

  async countNftsPerPlanet(): Promise<any[]> {
    return this.prisma.$queryRaw`
      SELECT pdn.planetDetailId, COUNT(*) as nftCount
      FROM Nft as n
      JOIN PlanetDetailNftMetadata as pdn ON n.metadataId = pdn.metadataId
      WHERE n.mintedAt IS NOT NULL AND n.ownerId IS NOT NULL
      GROUP BY pdn.planetDetailId
  `;
  }
}
