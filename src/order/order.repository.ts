import { Injectable, Logger } from "@nestjs/common";
import { Order, PaymentStatus, Prisma, SaleStage } from "@prisma/client";
import { CONSTANT, MESSAGES } from "src/constants";
import { PrismaService } from "src/prisma/prisma.service";
import { UtilsService } from "src/utils/utils.service";

@Injectable()
export class OrderRepository {
  constructor(
    private prisma: PrismaService,
    private readonly utilService: UtilsService
  ) {}
  private readonly logger = new Logger();

  async createOrder(params: {
    orderData: Prisma.OrderUncheckedCreateInput;
    strainUpdate: {
      strainId: string;
      stockQuantity: number;
      locationId: string;
      locationStockQuantity: number;
      isAvailable: boolean;
      availabilityOnLocation: boolean;
    }[];
    saleId?: string;
  }) {
    try {
      const { orderData: data, strainUpdate, saleId } = params;
      return await this.prisma.$transaction(
        async (tx) => {
          //create order with sale if 2nd order
          const order = await tx.order.create({ data });

          if (saleId) {
            //update sale if first order
            await tx.sale.update({
              where: { id: saleId },
              data: {
                stage: SaleStage.ONGOING,
                order: {
                  connect: {
                    id: order.id,
                  },
                },
              },
            });
          }

          //clearing items from clientCart
          await tx.clientCart.update({
            where: { clientId: data.clientId },
            data: {
              cartItems: {
                deleteMany: {},
              },
            },
          });

          //subtract the quanity from strain stock
          await Promise.all(
            strainUpdate.map(async (query) => {
              await tx.strain.update({
                where: {
                  id: query.strainId,
                },
                data: {
                  stockQuantity: query.stockQuantity,
                  isAvailable: query.isAvailable,
                  strainLocations: {
                    update: {
                      where: {
                        strainId_locationId: {
                          strainId: query.strainId,
                          locationId: query.locationId,
                        },
                      },
                      data: {
                        stockQuantity: query.locationStockQuantity,
                        isAvailable: query.availabilityOnLocation,
                      },
                    },
                  },
                },
              });
            })
          );
          return order;
        },
        { maxWait: 10000, timeout: 20000 }
      );
    } catch (error) {
      this.logger.error(error);
      if (error.code === CONSTANT.DB_ERROR_CODE.FOREIGN_KEY) {
        throw new Error(MESSAGES.ERROR.FOREIGN_KEY);
      }
      throw new Error(MESSAGES.ERROR.ORDER.CREATE_FAILED);
    }
  }

  async updateOrder(params: {
    where: Prisma.OrderWhereUniqueInput;
    data: Prisma.OrderUncheckedUpdateInput;
    select?: Prisma.OrderSelect
  }): Promise<Order> {
    try {
      const { where, data } = params;
      return await this.prisma.order.update({ where, data });
    } catch (error) {
      if (error.code === CONSTANT.DB_ERROR_CODE.NOT_FOUND) {
        throw new Error(MESSAGES.ERROR.ORDER.NOT_FOUND);
      }
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.ORDER.UPDATE_FAILED);
    }
  }

  async updateOrdersApproval(params: {
    where: Prisma.OrderWhereInput;
    data: Prisma.OrderUpdateInput;
  }) {
    try {
      const { where, data } = params;
      return await this.prisma.order.updateMany({ where, data });
    } catch (error) {
      if (error.code === "P2025") {
        throw new Error(MESSAGES.ERROR.ORDER.NOT_FOUND);
      }
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.ORDER.UPDATE_FAILED);
    }
  }

  async createOrderLogs(params: { data: Prisma.OrderLogsCreateManyInput[] }) {
    try {
      const { data } = params;
      return await this.prisma.orderLogs.createMany({
        data,
        skipDuplicates: true,
      });
    } catch (error) {
      if (error.code === "P2025") {
        throw new Error(MESSAGES.ERROR.ORDER.NOT_FOUND);
      }
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.ORDER.UPDATE_FAILED);
    }
  }

  async getAllOrders(params: {
    where?: Prisma.OrderWhereInput;
    select?: Prisma.OrderSelect;
    include?: Prisma.OrderInclude;
    orderBy?: Prisma.OrderOrderByWithAggregationInput;
    take?: number;
    skip?: number;
  }): Promise<{ orders: any[]; count: number }> {
    try {
      const CHUNK_SIZE = 500;
      const { where, take } = params;
  
      if (take && take > CHUNK_SIZE) {
        const orders: any[] = [];
        let skipCount = params.skip || 0;
        let remaining = take;
  
        while (remaining > 0) {
          const chunkTake = Math.min(CHUNK_SIZE, remaining);
          const chunkOrders = await this.prisma.order.findMany({
            ...params,
            skip: skipCount,
            take: chunkTake,
          });
  
          if (chunkOrders.length === 0) {
            break; 
          }
  
          orders.push(...chunkOrders);
          skipCount += chunkTake;
          remaining -= chunkTake;
        }
  
        const count = await this.prisma.order.count({ where });
        return { orders, count };
      }
  
      const [orders, count] = await this.prisma.$transaction([
        this.prisma.order.findMany({ ...params }),
        this.prisma.order.count({ where }),
      ]);
  
      return { orders, count };
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.ORDER.FETCH_FAILED);
    }
  }

  async getOrder(params: {
    where: Prisma.OrderWhereUniqueInput;
    include?: Prisma.OrderInclude;
    select?: Prisma.OrderSelect;
  }): Promise<any> {
    try {
      return await this.prisma.order.findUnique({ ...params });
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.ORDER.FETCH_FAILED);
    }
  }

  async getCartList(params: {
    where: Prisma.ClientCartWhereUniqueInput;
    include?: Prisma.ClientCartInclude;
    select?: Prisma.ClientCartSelect;
  }): Promise<any> {
    try {
      return await this.prisma.clientCart.findUnique({ ...params });
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.STRAIN.CART.FETCH_FAILED);
    }
  }

  async groupByOrders(params: {
    by: [Prisma.OrderScalarFieldEnum];
    _count?: Prisma.OrderCountAggregateInputType;
    _min?: Prisma.OrderMinAggregateInputType;
    _max?: Prisma.OrderMaxAggregateInputType;
    having?;
    where?: Prisma.OrderWhereInput;
  }) {
    try {
      const [summary, count] = await this.prisma.$transaction([
        this.prisma.order.groupBy(params),
        this.prisma.order.count({ where: params.where }),
      ]);

      return {
        summary,
        count,
      };
    } catch (error) {
      throw error;
    }
  }

  async getOrdersChartData(
    nftId: string,
    startDate: Date,
    endDate: Date,
    parameter: string,
    clientIds: string[]
  ) {
    try {
      let joinBy = "";
      let byCountryCode = "";
      let byNftId = "";
      if (nftId) {
        byNftId += `AND o."nftId" = '${nftId}'`;
      }
      endDate.setDate(endDate.getDate() + 1);
      const startDateForRawQuery = this.utilService.formatDateToUTC(startDate);
      const endDateTimeForRawQuery = this.utilService.formatDateToUTC(endDate);
      if (clientIds) {
        joinBy += ` JOIN "Client" c ON o."clientId" = c.id `;
        byCountryCode += ` AND c.id in ('${clientIds.join("', '")}')`;
      }
      const data = await this.prisma
        .$queryRawUnsafe(`SELECT DATE_TRUNC('${parameter}', o."createdAt") AS RANGE, 
          COUNT(*)::INT AS data 
          FROM "Order" o ${joinBy}
          WHERE o."createdAt" >= DATE('${startDateForRawQuery}')
          AND o."createdAt" <= DATE('${endDateTimeForRawQuery}')
          ${byNftId}
          ${byCountryCode} GROUP BY RANGE ORDER BY RANGE ASC;`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getOrdersStatusBreakdown(
    nftId: string,
    startDate: Date,
    endDate: Date,
    clientIds: string[]
  ) {
    try {
      let joinBy = "";
      let byCountryCode = "";
      let byNftId = "";
      if (nftId) {
        byNftId += `AND o."nftId" = '${nftId}'`;
      }
      if (clientIds) {
        joinBy += ` JOIN "Client" c ON o."clientId" = c.id `;
        byCountryCode += ` AND c.id in ('${clientIds.join("', '")}')`;
      }
      endDate.setDate(endDate.getDate() + 1);
      const startDateForRawQuery = this.utilService.formatDateToUTC(startDate);
      const endDateTimeForRawQuery = this.utilService.formatDateToUTC(endDate);
      const data: any = await this.prisma.$queryRawUnsafe(`SELECT 
        status,
        ROUND((COUNT(*) * 100.0 / total)::numeric, 2) AS percentage
      FROM (
        SELECT 
          CASE 
            WHEN o."adminApproval" = 'PENDING' THEN 'Pending'
            WHEN o."adminApproval" = 'VERIFIED' THEN 'Verified'
            WHEN o."adminApproval" = 'REJECTED' THEN 'Rejected'
          END AS status,
          COUNT(*) OVER () AS total
        FROM "Order" o ${joinBy}
        WHERE o."createdAt" >= DATE('${startDateForRawQuery}')
        AND o."createdAt" <= DATE('${endDateTimeForRawQuery}')
        ${byNftId} ${byCountryCode}
      ) subquery
      GROUP BY status, total`);

      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateCommissionStatus(orderId: string, transactionHash: string) {
    try {
      await this.prisma.$transaction([
        this.prisma.commissions.updateMany({
          where: { orderId: orderId },
          data: { paymentStatus: PaymentStatus.PAID },
        }),
        this.prisma.order.update({
          where: { id: orderId },
          data: {
            commissionPaid: true,
            commissionTransactionHash: transactionHash,
          },
        }),
      ]);
      return MESSAGES.SUCCESS.DEFAULT;
    } catch (error) {
      throw error;
    }
  }
}
