import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  Logger,
} from "@nestjs/common";
import { User, Prisma } from "@prisma/client";
import { CartDto, CreateCartItemsDto } from "src/strain/dto/request.dto";
import { CartsRepository } from "./carts.repository";
import { DeleteCartQueryDto, GetCartsDto } from "./dto/request.dto";
import { MESSAGES } from "src/constants";

@Injectable()
export class CartsService {
  constructor(private readonly cartRepository: CartsRepository) {}
  private readonly logger = new Logger();

  //TODO: we have to update as well. If user add same items than it should add or replace
  async addStrainToCart(data: CreateCartItemsDto) {
    try {
      const { clientCartId, items } = data;
      await this.validateStrainAvailability(clientCartId, items);
      const itemsAdded = await this.cartRepository.addToCart({
        data: items,
        clientCartId: clientCartId,
      });

      return {
        message: `${itemsAdded.count} items added to the cart`,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getCartList(user: User, query: GetCartsDto) {
    try {
      const { search, page, take, skip, orderBy } = query;
      const where: Prisma.ClientWhereInput = {};
      where.nftId = user.primaryNftId;
      where.clientCart = {
        some: {
          cartItems: {
            some: {},
          },
        },
      };
      if (search) {
        where.OR = [
          {
            firstName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        ];
      }
      const { clients, count } = await this.cartRepository.getCartList({
        where,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          clientCart: {
            select: {
              id: true,
              cartItems: {
                select: {
                  quantity: true,
                  createdAt: true,
                  strain: {
                    select: {
                      id: true,
                      retailPrice: true,
                      name: true,
                    },
                  },
                },
                orderBy: { createdAt: Prisma.SortOrder.desc },
              },
            },
          },
        },
        orderBy: { createdAt: orderBy ? orderBy : Prisma.SortOrder.desc },
        skip,
        take,
      });

      clients.forEach((cartList) => {
        cartList.clientCart.map((carts) => {
          let totalAmount = 0;
          let totalQuatity = 0;
          carts?.cartItems.map((item) => {
            totalQuatity += item.quantity;
            totalAmount += item.quantity * item.strain.retailPrice;
            item.totalAmount = item.quantity * item.strain.retailPrice;
          });
          carts.totalAmount = totalAmount;
          carts.totalQuatity = totalQuatity;
          carts.createdAt = carts.cartItems[0].createdAt;
        });
      });

      return { clients, paginationCount: count };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async deleteStrainOrEntireStrainsFromCart(
    req,
    query: DeleteCartQueryDto,
    strainId: string
  ) {
    try {
      const { cartId } = query;
      const where: Prisma.ClientCartWhereInput = {
        id: cartId,
      };
      const isExist = await this.cartRepository.clientCartExistance(where);
      if (!isExist) {
        throw new BadGatewayException(MESSAGES.ERROR.CLIENT.CART_NOT_FOUND);
      }
      if (strainId) {
        where.cartItems = {
          some: { strainId },
        };
        const isExist = await this.cartRepository.clientCartExistance(where);
        if (!isExist) {
          throw new BadGatewayException(
            MESSAGES.ERROR.CLIENT.CART_ITEM_NOT_FOUND
          );
        }
        return await this.cartRepository.deleteStrainFromCart(strainId, cartId);
      } else {
        return await this.cartRepository.deleteEntireCart(cartId);
      }
    } catch (error) {
      throw error;
    }
  }

  async validateStrainAvailability(clientCartId: string, items: CartDto[]) {
    const clientCart = await this.cartRepository.getClientCart({
      where: { id: clientCartId },
      include: {
        client: {
          include: {
            shippings: {
              select: { countryCode: true },
            },
          },
        },
      },
    });

    if (
      !clientCart ||
      !clientCart.client ||
      !clientCart.client["shippings"].length
    ) {
      throw new BadRequestException("Client shipping address not found.");
    }

    const shipping = clientCart.client["shippings"][0];
    const countryCode = shipping.countryCode;

    if (!countryCode) {
      throw new BadRequestException("Shipping country code is required.");
    }

    for (const item of items) {
      const strainLocation = await this.cartRepository.getStrainAvailability({
        strainId: item.strainId,
        location: { countryCode },
        isAvailable: true,
        isActive: true,
      });

      if (!strainLocation) {
        throw new BadRequestException(
          `Strain ${item.strainId} is not available in your region (${countryCode})`
        );
      }

      if (strainLocation && strainLocation.stockQuantity < item.quantity) {
        throw new BadRequestException(
          `Strain ${item.strainId} is not available in sufficient quantity in your region (${countryCode})`
        );
      }
    }
  }
}
