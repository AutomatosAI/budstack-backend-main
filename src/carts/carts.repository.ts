import { Injectable, Logger } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CONSTANT, MESSAGES } from "src/constants";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CartsRepository {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger();

  async addToCart(params: { data: any[]; clientCartId: string }): Promise<any> {
    try {
      const { data } = params;
      return this.prisma.$transaction(async (tx) => {
        const cartItems = await tx.cartItems.findMany({
          where: {
            clientCartId: params.clientCartId,
          },
        });

        const allCartItems = [...data, ...cartItems];

        const uniqueCartItems = allCartItems.reduce((acc, cur) => {
          const found = acc.findIndex((item) => item.strainId === cur.strainId);
          if (found === -1) {
            acc.push({
              quantity: cur.quantity,
              strainId: cur.strainId,
              clientCartId: params.clientCartId,
            });
          } else {
            acc[found].quantity += cur.quantity;
          }
          return acc;
        }, []);

        await tx.cartItems.deleteMany({
          where: {
            clientCartId: params.clientCartId,
          },
        });

        return await tx.cartItems.createMany({
          data: uniqueCartItems,
        });
      });
    } catch (error) {
      this.logger.error(error);
      if (error.code === CONSTANT.DB_ERROR_CODE.UNIQUE_CONSTRAINT) {
        throw new Error(MESSAGES.ERROR.STRAIN.ALREADY_EXIST);
      }
      throw new Error(MESSAGES.ERROR.STRAIN.CREATE_FAILED);
    }
  }

  async getCartList(params: {
    where: Prisma.ClientWhereInput;
    select?: Prisma.ClientSelect;
    orderBy?: Prisma.ClientOrderByWithAggregationInput;
    take?: number;
    skip?: number;
  }): Promise<any> {
    try {
      const [clients, count] = await this.prisma.$transaction([
        this.prisma.client.findMany({ ...params }),
        this.prisma.client.count({
          where: params.where,
        }),
      ]);
      return { clients, count };
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.STRAIN.CART.FETCH_FAILED);
    }
  }

  async deleteEntireCart(clientCartId: string): Promise<any> {
    try {
      await this.prisma.cartItems.deleteMany({
        where: {
          clientCartId,
        },
      });

      return { message: MESSAGES.SUCCESS.CART.DELETED };
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.STRAIN.CART.DELETE_FAILED);
    }
  }

  async getClientCart(params: {
    where: Prisma.ClientCartWhereUniqueInput;
    include: Prisma.ClientCartInclude;
  }) {
    try {
      return await this.prisma.clientCart.findUnique({ ...params });
    } catch (error) {
      throw error;
    }
  }

  async clientCartExistance(where: Prisma.ClientCartWhereInput) {
    try {
      return await this.prisma.clientCart.findFirst({ where });
    } catch (error) {
      throw error;
    }
  }

  async getStrainAvailability(where: Prisma.StrainLocationWhereInput) {
    try {
      return await this.prisma.strainLocation.findFirst({
        where,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteStrainFromCart(
    strainId: string,
    clientCartId: string
  ): Promise<any> {
    try {
      return this.prisma.$transaction(async (tx) => {
        // Check if the cart item exists
        const cartItem = await tx.cartItems.findFirst({
          where: {
            strainId,
            clientCartId,
          },
        });

        if (!cartItem) {
          throw new Error(MESSAGES.ERROR.STRAIN.NOT_FOUND);
        }

        // Delete the cart item
        await tx.cartItems.delete({
          where: {
            id: cartItem.id,
          },
        });

        return { message: MESSAGES.SUCCESS.CART.STRAIN.DELETED };
      });
    } catch (error) {
      this.logger.error(error);
      if (error.message === MESSAGES.ERROR.STRAIN.NOT_FOUND) {
        throw error;
      }
      throw new Error(MESSAGES.ERROR.STRAIN.CART.DELETE_FAILED);
    }
  }
}
