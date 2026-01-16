import {
  Controller,
  Get,
  Param,
  Logger,
  Query,
  UseGuards,
  Req,
  Body,
  Patch,
  Post,
} from "@nestjs/common";
import { MarketplaceService } from "./marketplace.service";
import { ApiResponse } from "@nestjs/swagger";
import {
  GetAllTransactionDto,
  GetWhiteListedDto,
} from "./dto/get-transaction.dto";
import { AuthGuard } from "@nestjs/passport";
import {
  getAllNftDto,
  getNftByTokenDto,
  SaleNftDto,
  getNftByIdDto,
  UpdateNftSaleDto,
} from "src/nft/nft.dto";
import {
  GetAllPlanetDetailsDto,
  planetNoDto,
} from "src/planet/dto/request.dto";

/**
 * Controller handling HTTP requests related to marketplace operations.
 */
@Controller("marketplace")
export class MarketplaceController {
  constructor(private readonly marketPlaceService: MarketplaceService) {}

  private readonly logger = new Logger();

  /**
   * Retrieves a list of all planets based on the provided query parameters.
   * @param query An object of type GetAllPlanetDetailsDto containing filters and search criteria for fetching planets.
   * @returns A promise that resolves to a list of planets matching the provided query parameters.
   */
  @Get("/planets")
  @ApiResponse({
    status: 200,
    description: "To get all the Planets",
  })
  async getAllPlanets(@Query() query: GetAllPlanetDetailsDto) {
    return this.marketPlaceService.getAllPlanets(query);
  }

  /**
   * Retrieves detailed information about a planet based on its number.
   * @param param An object containing the planet number.
   * @returns A promise that resolves to the details of the planet corresponding to the provided planet number.
   */
  @Get("/planets/:planetNo")
  @ApiResponse({
    status: 200,
    description: "To get Planet detail with strain details by PlanetNo",
  })
  async getPlanetDetailByPlanetNo(@Param() param: planetNoDto) {
    return this.marketPlaceService.getPlanetDetailsByPlanetNo(param.planetNo);
  }

  /**
   * Handles HTTP GET requests to the "marketplace/nfts" endpoint.
   * Retrieves a list of NFTs based on the provided query parameters and the authenticated user's information.
   *
   * @param query An object of type `getAllNftDto` containing various filters and search criteria for fetching NFTs.
   * @param req The request object containing user information, specifically `req.user`.
   * @returns A promise that resolves to a list of NFTs matching the provided query parameters and user information.
   */
  @Get("/nfts")
  @ApiResponse({
    status: 200,
    description: "To get Nfts",
  })
  async getAllNfts(@Query() query: getAllNftDto, @Req() req) {
    return await this.marketPlaceService.getAllNfts(query, req.user);
  }

  /**
   * Retrieves a list of NFTs owned by the authenticated user.
   * Uses JWT authentication to ensure user is authenticated.
   *
   * @param query An object of type `getAllNftDto` containing filters and search criteria for fetching NFTs.
   * @param req The request object containing user information, specifically `req.user`.
   * @returns A promise that resolves to a list of NFTs owned by the authenticated user.
   */
  @UseGuards(AuthGuard("jwt"))
  @Get("/nfts/holder")
  @ApiResponse({
    status: 200,
    description: "To get Nft by owner id",
  })
  async getNftByHolderId(@Query() query: getAllNftDto, @Req() req) {
    return await this.marketPlaceService.getNftByHolderId(query, req.user);
  }

  /**
   * Retrieves an NFT by its token ID.
   * @param param An object containing the token ID of the NFT.
   * @param req The request object containing user information.
   * @returns A promise that resolves to the details of the NFT corresponding to the provided token ID.
   */
  @Get("/nfts/:tokenId")
  @ApiResponse({
    status: 200,
    description: "To get Nft by id",
  })
  async getNftById(@Param() param: getNftByTokenDto, @Req() req) {
    return await this.marketPlaceService.getNftById(param, req.user);
  }

  /**
   * Handles the creation of a sale for an NFT.
   * Uses JWT authentication to ensure the user is authenticated before allowing the sale.
   *
   * @param body An object of type SaleNftDto containing the details of the NFT sale.
   * @param req The request object containing user information, specifically req.user.
   * @returns A promise that resolves to the result of the createSaleForNft method from the nftService.
   */
  @ApiResponse({
    status: 201,
    description: "To create nft sale",
  })
  @UseGuards(AuthGuard("jwt"))
  @Post("/nfts/sale") // user will put nft on sale
  async createSaleForNft(@Body() body: SaleNftDto, @Req() req) {
    return await this.marketPlaceService.createSaleForNft(body, req.user);
  }

  /**
   * Cancels an NFT sale by its ID.
   *
   * @param params An object containing the ID of the NFT sale to be canceled.
   * @param body An object of type UpdateNftSaleDto containing the tokenId and signature.
   * @param req The request object containing user information, specifically req.user.
   * @returns A promise that resolves to the result of the cancelSaleBySaleId method from the nftService.
   */
  @ApiResponse({
    status: 200,
    description: "To update nft sale",
  })
  @UseGuards(AuthGuard("jwt"))
  @Patch("/nfts/sale/:id") //user can cancel the nft on sale
  async cancelSaleBySaleId(
    @Param() params: getNftByIdDto,
    @Body() body: UpdateNftSaleDto,
    @Req() req
  ) {
    return await this.marketPlaceService.cancelSaleBySaleId(
      params.id,
      body,
      req.user
    );
  }

  /**
   * Fetches all transactions based on the provided token ID.
   * @param query Object containing the token ID
   * @returns Promise with the transactions
   */
  @Get("/transactions/nft")
  async getAllTransactionsByTokenId(@Query() query: GetAllTransactionDto) {
    return this.marketPlaceService.getAllTransaction(query);
  }

  /**
   * Fetches all transactions for the authenticated user.
   * @param query Object containing the token ID
   * @param req Request object
   * @returns Promise with the transactions
   */
  @UseGuards(AuthGuard("jwt"))
  @Get("/transactions/user")
  async getAllTransactionsByUser(
    @Query() query: GetAllTransactionDto,
    @Req() req
  ) {
    return this.marketPlaceService.getAllTransaction(query, req.user);
  }

  /**
   * Retrieves the count of minted NFTs per planet.
   * @returns Promise with the count of minted NFTs per planet
   */
  @Get("/minted-nfts")
  @ApiResponse({
    status: 200,
    description: "Get all planets with the count of minted NFTs",
  })
  async getPlanetsWithMintedNftsCount() {
    return await this.marketPlaceService.getNftsPerPlanet();
  }

  /**
   * Checks if a wallet address is whitelisted.
   * @param query Object containing the wallet address
   * @returns Promise with the whitelisting status
   */
  @Get("/isWhiteListed")
  @ApiResponse({
    status: 200,
    description: "Check and return if the wallet address is whitelisted",
  })
  async checkWalletAddressWhitelisting(@Query() query: GetWhiteListedDto) {
    return await this.marketPlaceService.checkWalletAddressWhitelisting(
      query.walletAddress
    );
  }

  /**
   * Gets the minting status of a specific contract.
   * @param contractId The ID of the contract
   * @returns Promise with the minting status
   */
  @Get(":contractId/minting-status")
  @ApiResponse({
    status: 200,
    description: "Get the minting status of a contract",
  })
  @ApiResponse({
    status: 404,
    description: "Contract not found",
  })
  async getMintingStatus(@Param("contractId") contractId: string) {
    return this.marketPlaceService.getMintingStatus(contractId);
  }
}
