import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { MarketPlaceRepository } from "./marketplace.repository";
import { NftService } from "src/nft/nft.service";
import {
  NftTransactionType,
  NftType,
  PlanetDetail,
  Prisma,
} from "@prisma/client";
import { GetAllTransactionDto } from "./dto/get-transaction.dto";
import {
  getAllNftDto,
  OrderFrom,
  getNftByTokenDto,
  SaleNftDto,
  UpdateNftSaleDto,
} from "src/nft/nft.dto";
import { ethers } from "ethers";
import { abi } from "nft-contract-abi";
import { CONSTANT, MESSAGES } from "src/constants";
import { ConfigService } from "@nestjs/config";
import { configData } from "src/config";
import { NftRepository } from "src/nft/nft.repository";
import { PlanetRepository } from "src/planet/planet.repository";

@Injectable()
export class MarketplaceService {
  constructor(
    private readonly marketPlaceRepository: MarketPlaceRepository,
    private readonly nftService: NftService,
    private readonly nftRepository: NftRepository,
    private readonly planetRepository: PlanetRepository,
    private readonly configService: ConfigService
  ) { }
  config: any = configData(this.configService);
  private readonly logger = new Logger(MarketplaceService.name);

  async getAllPlanets(
    query
  ): Promise<{ planets: PlanetDetail[]; paginationCount: number }> {
    try {
      const { skip, take, page, orderBy, search, searchBy, ...filters } = query;
      const where: Prisma.PlanetDetailWhereInput = {
        ...filters,
      };

      if (searchBy) {
        where[searchBy] = { contains: search };
      }

      const { planets, count } = await this.planetRepository.getAllPlanets({
        where,
        select: {
          planetNo: true,
          name: true,
          imageUrl: true,
          thumbnailImageUrl: true,
        },
        orderBy: { planetNo: orderBy },
        skip: skip,
        take: take,
      });

      return {
        planets,
        paginationCount: count,
      };
    } catch (error) {
      this.logger.error("Error fetching all planets", error);
      throw error;
    }
  }

  async getPlanetDetailsByPlanetNo(
    planetNo: number
  ): Promise<PlanetDetail | null> {
    try {
      if (planetNo > 20) {
        let response;

        if (planetNo === 21) {
          response = CONSTANT.PLANET_DETAILS.GOLD;
        } else if (planetNo === 22) {
          response = CONSTANT.PLANET_DETAILS.PLATNIUM;
        }

        const allStrains = await this.planetRepository.getAllPlanets({
          select: {
            strains: {
              select: {
                strain: {
                  select: {
                    name: true,
                    imageUrl: true,
                    description: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: "asc" },
        });

        const strains = [];
        allStrains.planets.map((planet: any) => {
          strains.push(...planet.strains);
        });

        response.strains = strains;
        return response;
      }

      return await this.marketPlaceRepository.getPlanetDetailByPlanetId({
        where: { planetNo },
        select: {
          planetNo: true,
          planetDetailJson: true,
          videoUrl: true,
          iosVideoUrl: true,
          imageUrl: true,
          name: true,
          description: true,
          chronicles: true,
          strains: {
            where: { strain: { isDeleted: false } },
            select: {
              strain: {
                select: {
                  name: true,
                  imageUrl: true,
                  description: true,
                  feelings: true,
                  flavour: true,
                  helpsWith: true,
                  cbd: true,
                  thc: true,
                  cbg: true,
                  popularity: true,
                  retailPrice: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(
        `Error fetching details for planet number ${planetNo}`,
        error
      );
      throw error;
    }
  }

  async getAllNfts(query: getAllNftDto, user) {
    try {
      let nftMetadata: Prisma.NftMetadataWhereInput = {};
      let premium: Prisma.NftMetadataWhereInput[] = [];
      if (query.planetNo.length) {
        //for gold NFT
        if (query.planetNo.includes(21)) {
          this.remove(query.planetNo, 21);
          premium.push({
            nftType: NftType.Gold,
          });
        }

        //for platnium NFT
        if (query.planetNo.includes(22)) {
          this.remove(query.planetNo, 22);
          premium.push({
            nftType: NftType.Platinum,
          });
        }

        nftMetadata = {
          OR: [
            ...premium,
            {
              planetDetails: {
                some: {},
                every: {
                  planetDetail: {
                    planetNo: {
                      in: query.planetNo,
                    },
                  },
                },
              },
            },
          ],
        };
      }

      if (query.searchBy && query.search) {
        nftMetadata[query.searchBy] = {
          contains: query.search,
          mode: "insensitive",
        };
      }

      let { nfts, count } = await this.marketPlaceRepository.getAllNfts({
        where: {
          ownerId: { not: null },
          metadataId: { not: null },
          isListedForSale:
            typeof query.isListedForSale === "number"
              ? !!query.isListedForSale
              : undefined,
          nftMetadata,
        },
        select: {
          id: true,
          tokenId: true,
          metadataId: true,
          mintedAt: true,
          isListedForSale: true,
          ownerId: true,
          updatedAt: true,
          owner: {
            select: {
              profileUrl: true,
              id: true,
            },
          },
          nftSalesHistory: {
            where: {
              isListed: true,
              buyerId: null,
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
            select: {
              signature: true,
              salePrice: true,
              timestamp: true,
              id: true,
              createdAt: true,
            },
          },
          nftMetadata: {
            select: {
              nftType: true,
              nftName: true,
              imageUrl: true,
              planetDetails: {
                select: {
                  planetDetail: {
                    select: {
                      planetNo: true,
                      name: true,
                      imageUrl: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: query.isListedForSale
          ? { updatedAt: query.orderBy }
          : { mintedAt: query.orderBy },
        skip: query.skip,
        take: query.take,
      });

      if (query.orderFrom === OrderFrom.PRICE) {
        nfts = this.sortByPrice(
          nfts,
          query.orderFrom === OrderFrom.PRICE ? query.orderBy : null
        );
      }

      return {
        nfts,
        paginationCount: count,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getNftById(param: getNftByTokenDto, user) {
    try {
      const nft: any = await this.nftRepository.getNft({
        where: {
          ...param,
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
              planetDetails: {
                take: 1,
                select: {
                  planetDetailId: true,
                  planetDetail: {
                    select: { name: true, imageUrl: true, description: true },
                  },
                },
              },
            },
          },
          nftSalesHistory: { orderBy: { createdAt: Prisma.SortOrder.desc } },
          nftTransactions: { orderBy: { createdAt: Prisma.SortOrder.desc } },
        },
      });
      if (!nft) {
        throw new NotFoundException(MESSAGES.ERROR.NFT.NOT_FOUND);
      }
      const contractDetails = await this.nftRepository.getContractDetails(
        this.config.NFT_CONTRACT_ID
      );
      // Check if metadataId exists and fetch additional data
      if (nft.nftMetadata && nft.nftMetadata.metadataId) {
        const metadataId = nft.nftMetadata.metadataId;
        const response: any = await this.nftRepository.getNftStrains(
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

      return { ...nft, ...contractDetails };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getNftByHolderId(query: getAllNftDto, user) {
    try {
      let { nfts, count } = await this.marketPlaceRepository.getAllNfts({
        where: {
          ownerId: user.walletAddress,
          isListedForSale:
            typeof query.isListedForSale === "number"
              ? !!query.isListedForSale
              : undefined,
        },
        include: {
          owner: {
            select: {
              walletAddress: true,
              username: true,
              profileUrl: true,
              id: true,
            },
          },
          nftMetadata: {
            select: {
              nftType: true,
              nftName: true,
              imageUrl: true,
              planetDetails: {
                include: {
                  planetDetail: {
                    select: {
                      planetNo: true,
                      name: true,
                      imageUrl: true,
                    },
                  },
                },
              },
            },
          },
          nftSalesHistory: { orderBy: { createdAt: Prisma.SortOrder.desc } },
        },
        orderBy: query.isListedForSale
          ? { updatedAt: query.orderBy }
          : { mintedAt: query.orderBy },
        skip: query.skip,
        take: query.take,
      });

      if (query.orderFrom === OrderFrom.PRICE) {
        nfts = this.sortByPrice(
          nfts,
          query.orderFrom === OrderFrom.PRICE ? query.orderBy : null
        );
      }
      return {
        nfts,
        paginationCount: count,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async createSaleForNft(body: SaleNftDto, user) {
    try {
      const {tokenId, salePrice, signature, timestamp} = body;
      const saleNft = await this.marketPlaceRepository.getManyNftSale({
        where: {
          tokenId: tokenId,
          buyerId: null,
          isListed: true,
        },
      });

      if (saleNft.length > 0) {
        throw new BadRequestException(MESSAGES.ERROR.NFT.ALREADY_ON_SALE);
      }

      const provider = new ethers.JsonRpcProvider(this.config.RPC_PROVIDER_URL);

      // Address of the contract (replace with your contract's address)
      const contractAddress = this.config.NFT_CONTRACT_ID;
      const marketAddress = this.config.NFT_MARKETPLACE_CONTRACT_ID;
      const marketplaceContractName = this.config.NFT_MARKETPLACE_CONTRACT_NAME;
      const chainId = this.config.CONTRACT_DEPLOYED_CHAIN_ID;

      // Create a contract instance
      const contract = new ethers.Contract(contractAddress, abi, provider);

      // Function to call on the contract
      const functionName = ["ownerOf", "isApprovedForAll"];
      const tokenOwner = await contract[functionName[0]](tokenId);
      const isApproved = await contract[functionName[1]](
        user.walletAddress,
        marketAddress
      );

      if (user.walletAddress.toLowerCase() !== tokenOwner.toLowerCase()) {
        throw new BadRequestException(MESSAGES.ERROR.CONTRACT.NOT_VALID_OWNER);
      }

      if (!isApproved) {
        throw new BadRequestException(MESSAGES.ERROR.CONTRACT.NOT_APPROVED);
      }
      const salt = ethers.id(`${user.id}_${timestamp}`);
      const saltBytes32 = ethers.hexlify(salt);
      const domain = {
        name: marketplaceContractName,
        version: "1",
        chainId: chainId,
        verifyingContract: marketAddress,
        salt: saltBytes32,
      };
      const types = {
        Sale: [
          { name: "owner", type: "address" },
          { name: "tokenId", type: "uint256" },
          { name: "amount", type: "uint256" },
        ],
      };
      const mail = {
        owner: user.walletAddress.toLowerCase(),
        tokenId: tokenId,
        amount: ethers.parseEther(`${salePrice}`),
      };
      const recoveredAddress = ethers.verifyTypedData(
        domain,
        types,
        mail,
        signature
      );

      if (recoveredAddress.toLowerCase() !== user.walletAddress.toLowerCase()) {
        throw new BadRequestException(
          MESSAGES.ERROR.CONTRACT.SIGNATURE_VERIFICATION_FAILED
        );
      }

      const saleData: Prisma.NftSaleUncheckedCreateInput = {
        tokenId: tokenId,
        salePrice: Number(salePrice),
        sellerId: user.id,
        signature: signature,
        timestamp
      };
      const nftTransactionData: Prisma.NftTransactionsUncheckedCreateInput = {
        tokenId: tokenId,
        from: user.walletAddress,
        type: NftTransactionType.LIST,
        price: Number(salePrice),
        timestamp: new Date(),
      };

      const nftSale = await this.marketPlaceRepository.OnSaleNft({
        saleData,
        nftTransactionData,
      });

      return {
        message: "NFT successfully listed for sale",
        nftSale,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async cancelSaleBySaleId(id: string, body: UpdateNftSaleDto, user) {
    try {
      const getNftSale = await this.marketPlaceRepository.getNftSale({
        where: {
          id,
        },
      });

      if (!getNftSale?.isListed) {
        throw new BadRequestException(MESSAGES.ERROR.NFT.ON_SALE_NOT_FOUND);
      }

      const provider = new ethers.JsonRpcProvider(this.config.RPC_PROVIDER_URL);

      // Address of the contract (replace with your contract's address)
      const contractAddress = this.config.NFT_CONTRACT_ID;
      const marketAddress = this.config.NFT_MARKETPLACE_CONTRACT_ID;
      const marketplaceContractName = this.config.NFT_MARKETPLACE_CONTRACT_NAME;
      const chainId = this.config.CONTRACT_DEPLOYED_CHAIN_ID;

      // Create a contract instance
      const contract = new ethers.Contract(contractAddress, abi, provider);

      // Function to call on the contract
      const functionName = ["ownerOf"];
      const tokenOwner = await contract[functionName[0]](body.tokenId);

      if (tokenOwner.toLowerCase() !== user.walletAddress.toLowerCase()) {
        throw new BadRequestException(MESSAGES.ERROR.CONTRACT.NOT_VALID_OWNER);
      }

      const salt = ethers.id(`${user.id}`);
      const saltBytes32 = ethers.hexlify(salt);
      const domain = {
        name: marketplaceContractName,
        version: "1",
        chainId: chainId,
        verifyingContract: marketAddress,
        salt: saltBytes32,
      };
      const types = {
        Sale: [
          { name: "type", type: "string" },
          { name: "owner", type: "address" },
          { name: "tokenId", type: "uint256" },
        ],
      };
      const mail = {
        type: "CANCELLED",
        owner: user.walletAddress.toLowerCase(),
        tokenId: body.tokenId,
      };
      const recoveredAddress = ethers.verifyTypedData(
        domain,
        types,
        mail,
        body.signature
      );

      if (recoveredAddress.toLowerCase() !== user.walletAddress.toLowerCase()) {
        throw new BadRequestException(
          MESSAGES.ERROR.CONTRACT.SIGNATURE_VERIFICATION_FAILED
        );
      }

      const nftTransactionData: Prisma.NftTransactionsUncheckedCreateInput = {
        tokenId: body.tokenId,
        from: user.walletAddress,
        type: NftTransactionType.LIST_CANCEL,
        price: getNftSale.salePrice,
        timestamp: new Date(),
      };

      const removeSale = await this.marketPlaceRepository.UpdateNftSale({
        whereSale: {
          id,
        },
        updateSale: {
          isListed: false,
          signature: body.signature,
        },
        nftTransactionData,
      });

      return {
        message: "NFT successfully unlisted from sale",
        removeSale,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private sortByPrice(data, sortByPrice = null) {
    let updatedArray = data;

    if (sortByPrice) {
      updatedArray = data.sort((a, b) =>
        sortByPrice === Prisma.SortOrder.asc
          ? a.nftSalesHistory[0]?.salePrice - b.nftSalesHistory[0]?.salePrice
          : b.nftSalesHistory[0]?.salePrice - a.nftSalesHistory[0]?.salePrice
      );
    }

    return updatedArray;
  }

  remove(array, valueToRemove) {
    const index = array.indexOf(valueToRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  async getMintingStatus(contractId: string): Promise<{
    mintedNfts: number;
    totalGoldLimit: number;
    totalPlatinumLimit: number;
    totalStandardLimit: number;
    totalGoldMinted: number;
    totalPlatinumMinted: number;
    totalStandardMinted: number;
    isMintPause: boolean;
    maxSupply: number;
    planetMintingLimit: number;
    planets: number[];
    royaltyFee: number;
    activeRoundId: number;
    isEnabled: boolean;
  }> {
    try {
      const contract = await this.marketPlaceRepository.getContractByContractId(
        {
          where: { address: contractId },
        }
      );

      if (!contract) {
        throw new NotFoundException(`Contract with ID ${contractId} not found`);
      }

      const mintedNfts = await this.nftService.countMintedNfts();

      const planetMintingLimit = contract.planetMintingLimit;

      const totalGoldMinted =
        await this.marketPlaceRepository.getTotalMintedNFTsByType(NftType.Gold);
      const totalPlatinumMinted =
        await this.marketPlaceRepository.getTotalMintedNFTsByType(
          NftType.Platinum
        );
      const totalStandardMinted =
        await this.marketPlaceRepository.getTotalMintedNFTsByType(
          NftType.Standard
        );

      let mintedPlanetsCount =
        await this.marketPlaceRepository.getMintedPlanetCount();
      mintedPlanetsCount = this.PlanetMintingCounts(mintedPlanetsCount);

      return {
        mintedNfts,
        totalGoldLimit: CONSTANT.GOLD_MINT_LIMIT,
        totalPlatinumLimit: CONSTANT.PLATINUM_MINT_LIMIT,
        totalStandardLimit: CONSTANT.STANDARD_MINT_LIMIT,
        totalGoldMinted,
        totalPlatinumMinted,
        totalStandardMinted,
        isMintPause: contract.isMintPause,
        maxSupply: contract.maxSupply,
        planetMintingLimit,
        planets: mintedPlanetsCount,
        royaltyFee: contract.royaltyFee,
        activeRoundId: contract.activeRoundId,
        isEnabled: contract.isEnabled,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  PlanetMintingCounts(mintedPlanetsCount) {
    const counts = Array.from({ length: 20 }, () => "0");

    mintedPlanetsCount.forEach(({ planetDetailId, count }) => {
      counts[planetDetailId - 1] = count.toString();
    });

    return counts;
  }

  async getNftsPerPlanet(): Promise<any[]> {
    try {
      return await this.nftService.countNftsPerPlanet();
    } catch (error) {
      this.logger.error(`Error getting NFTs per planet: ${error.message}`);
      throw new Error("Failed to get NFTs per planet");
    }
  }

  async getAllTransaction(query: GetAllTransactionDto, user = null) {
    try {
      const {
        skip,
        take,
        page,
        orderBy,
        tokenId,
        search,
        searchBy,
        ...filters
      } = query;

      const where: Prisma.NftTransactionsWhereInput = {
        ...filters,
      };

      if (user) {
        where.OR = [
          {
            from: user.walletAddress,
          },
          {
            to: user.walletAddress,
          },
        ];
      } else {
        where.tokenId = tokenId;
      }

      // for search by name
      if (query.searchBy && query.search) {
        where.nft = {
          nftMetadata: {
            [query.searchBy]: {
              contains: query.search,
              mode: "insensitive",
            },
          },
        };
      }

      const { transactions, count } =
        await this.marketPlaceRepository.getAllTransaction({
          where,
          select: {
            tokenId: true,
            type: true,
            from: true,
            to: true,
            timestamp: true,
            txHash: true,
            price: true,
            id: true,
          },
          orderBy: { timestamp: orderBy },
          skip: skip,
          take: take,
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

  async checkWalletAddressWhitelisting(walletAddress: string) {
    try {
      const result =
        await this.marketPlaceRepository.getWhitelistedAddressByWalletAddress({
          where: { walletAddress },
        });
      const response = await this.marketPlaceRepository.getUserWalletProof(walletAddress);
      if (!result) {
        {
          return {
            message: `Wallet address ${walletAddress} is not whitelisted`,
            walletAddress: walletAddress,
            isWhiteListed: false,
            walletProof: response ? response.proof.split(',') : null,
          };
        }
      }
      return {
        ...result,
        isWhiteListed: true,
        walletProof: response ? response.proof.split(',') : null,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
