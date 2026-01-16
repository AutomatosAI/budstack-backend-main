import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { CartsService } from "./carts.service";
import { AuthGuard } from "@nestjs/passport";
import { CreateCartItemsDto } from "src/strain/dto/request.dto";
import { DeleteCartQueryDto, GetCartsDto } from "./dto/request.dto";
import { DualAuthGuard } from "src/strategy/daap.jwt.strategy";

/**
 * Controller handling HTTP requests related to cart operations.
 */
@UseGuards(DualAuthGuard)
@Controller("")
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  /**
   * Adds items to a cart.
   * @param body The data containing items to be added to the cart.
   * @returns The result of adding items to the cart.
   */
  @Post("dapp/carts")
  async addStrainToCart(@Body() body: CreateCartItemsDto) {
    return this.cartsService.addStrainToCart(body);
  }

  /**
   * Deletes items or the entire cart.
   * @param req The request object.
   * @param query The query parameters for deletion.
   * @param strainId The ID of the strain to be deleted.
   * @returns The result of deleting items or the entire cart.
   */
  @Delete("dapp/carts/:cartId")
  async deleteEntireStrainsFromCart(
    @Req() req,
    @Param() query: DeleteCartQueryDto,
    @Query("strainId") strainId: string
  ) {
    return this.cartsService.deleteStrainOrEntireStrainsFromCart(req, query, strainId);
  }

  /**
   * Retrieves a list of carts.
   * @param req The request object.
   * @param query The query parameters for retrieving carts.
   * @returns The list of carts.
   */
  @Get("dapp/carts")
  async getCartList(@Req() req, @Query() query: GetCartsDto) {
    return this.cartsService.getCartList(req.user, query);
  }
}