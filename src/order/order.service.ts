import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  Query,
  UnauthorizedException,
} from "@nestjs/common";
import {
  CreateOrderDto,
  GetAllOrderDto,
  OrderIdDto,
  OrderIdsDto,
  OrderSearch,
  OrdersApprovalDto,
  OrdersRejectionDto,
  UpdateOrderDto,
  UpdateOrdersStatusDto,
  filterByClientsDto,
  updateOrderStatusDto,
} from "./dto.order";
import { OrderRepository } from "./order.repository";
import {
  AdminApprovalOnClient,
  AdminApprovalOnOrder,
  OrderActivity,
  OrderStatus,
  PaymentStatus,
  PermissionType,
  Prisma,
  Role,
  SaleStage,
  TransactionStatus,
  User,
} from "@prisma/client";
import { CONSTANT, MESSAGES } from "src/constants";
import { PaginationDto, filterByDate } from "src/constants/dto";
import { ClientRepository } from "src/client/client.repository";
import { UtilsService } from "src/utils/utils.service";
import { UserRepository } from "src/user/user.repository";
import { LOGIN_TYPE } from "src/constants/enums";
import { CommissionRepository } from "src/commission/commission.repository";
import { NotificationsService } from "src/notifications/notifications.service";
import { CommissionStatusDto } from "src/commission/commission.dto";
import { PaymentsService } from "src/payments/payments.service";
import { EmailService } from "src/email/email.service";

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly clientRepository: ClientRepository,
    private readonly userRepository: UserRepository,
    private readonly commissionRepository: CommissionRepository,
    private readonly notificationService: NotificationsService,
    private readonly paymentService: PaymentsService,
    private readonly utilsService: UtilsService,
    private readonly emailService: EmailService
  ) {}
  private readonly logger = new Logger();
  async createOrder(body: CreateOrderDto, user: User) {
    try {
      const generateInvoiceNumber = (clientId: string) => {
        return `DG_${Date.now()}${clientId}`;
      };
      const { clientId } = body;
      const nftId = user.primaryNftId;

      //Flow = order created -> verified by admin -> client do the payment -> order deliver flow -> user get commission after 30 days
      //if payment gets failed then add the items back to the stock

      const client = await this.clientRepository.getClientById({
        where: {
          id: clientId,
          nftId,
        },
        select: {
          firstName: true,
          lastName: true,
          isActive: true,
          isKYCVerified: true,
          adminApproval: true,
          shippings: {
            select: {
              id: true,
              countryCode: true,
              address1: true,
              address2: true,
              city: true,
              postalCode: true,
              country: true,
            },
          },
          sales: {
            where: {
              stage: SaleStage.LEADS,
            },
            select: {
              id: true,
            },
          },
        },
      });

      //check if client is active and isverified and approved by admin
      if (!client) throw new BadRequestException("Client is not found");

      if (!client.isActive)
        throw new BadRequestException("Client is not active");

      if (!client.isKYCVerified)
        throw new ConflictException("Client is not KYC verified");

      if (client.adminApproval !== AdminApprovalOnClient.VERIFIED) {
        throw new ConflictException(
          `Approval is ${client.adminApproval} by admin`
        );
      }

      const clientCart = await this.orderRepository.getCartList({
        where: {
          clientId,
        },
        select: {
          id: true,
          cartItems: {
            select: {
              quantity: true,
              strainId: true,
              strain: {
                select: {
                  retailPrice: true,
                  wholeSalePrice: true,
                  isAvailable: true,
                  isActive: true,
                  isDeleted: true,
                  stockQuantity: true,
                  name: true,
                  strainLocations: {
                    where: {
                      location: {
                        countryCode: client.shippings[0]?.countryCode,
                      },
                    },
                    select: {
                      strainId: true,
                      locationId: true,
                      stockQuantity: true,
                      isActive: true,
                      isAvailable: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!clientCart.cartItems.length) {
        throw new ConflictException(
          `Client does not have any item in the cart`
        );
      }

      const clientApprovalPayload = {
        fullName: `${client.firstName} ${client.lastName}`,
        clientId: clientId,
        orderId: "",
        orderDate: "",
        addressLine1: client.shippings[0].address1,
        addressLine2: client.shippings[0].address2,
        city: client.shippings[0].city,
        postCode: client.shippings[0].postalCode,
        country: client.shippings[0].country,
        productName1: clientCart.cartItems[0].strain.name,
        product1Quantity: clientCart.cartItems[0].quantity,
        productName2: clientCart.cartItems[1]
          ? clientCart.cartItems[1].strain.name
          : undefined,
        product2Quantity: clientCart.cartItems[1]
          ? clientCart.cartItems[1].quantity
          : undefined,
      };

      //check the isAvailabe and stockQuantity of strains
      const { updatedStrainQuantity, amount, profit } =
        this.checkCartValidity(clientCart);

      let saleId;
      let saleQuery;

      if (client.sales.length) {
        saleId = client.sales[0].id;
      } else {
        saleQuery = {
          create: {
            stage: SaleStage.ONGOING,
            clientId,
            nftId,
          },
        };
      }

      const createdOrder = await this.orderRepository.createOrder({
        orderData: {
          clientId,
          nftId,
          shippingId: client.shippings[0].id, //for now there is only one shipping address for client
          invoiceNumber: generateInvoiceNumber(clientId),
          agentProfit: profit,
          totalAmount: amount,
          orderLines: {
            createMany: { data: clientCart.cartItems },
          },
          sale: saleQuery,
        },
        strainUpdate: updatedStrainQuantity,
        saleId,
      });

      await this.notificationService.sendUserNotification({
        orderId: createdOrder.id,
        title: CONSTANT.NOTIFICATION.ORDER_PLACED.TITLE,
        message: CONSTANT.NOTIFICATION.ORDER_PLACED.MESSAGE,
        eventId: undefined,
        clientId: undefined,
        userId: undefined,
      });

      clientApprovalPayload.orderId = createdOrder.id;
      clientApprovalPayload.orderDate = createdOrder.createdAt.toISOString();
      this.emailService.sendEmail({
        data: {
          payload: {
            orderId: createdOrder.id,
            orderDate: createdOrder.createdAt,
            ...clientApprovalPayload,
          },
        },
        to_user: { email: CONSTANT.ADMIN_ORDER_MONITORING_EMAIL },
        subject: CONSTANT.EMAIL_SUBJECT.CLIENT_ORDER_APPROVAL(createdOrder.id),
        mail_type: CONSTANT.MAIL_TYPE.CLIENT_ORDER_APPROVAL,
        from_user: null,
        userType: undefined,
      });

      return createdOrder;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  checkCartValidity(cartData) {
    const updatedStrainQuantity = [];
    let profit = 0;
    let amount = 0;

    for (const item of cartData.cartItems) {
      if (
        !item.strain.isAvailable ||
        item.strain.isDeleted ||
        !item.strain.strainLocations ||
        !item.strain.strainLocations[0]?.isAvailable
      ) {
        throw new ConflictException(`${item.strain.name} is not available`);
      }

      if (!item.strain.isActive || !item.strain.strainLocations[0].isActive) {
        throw new ConflictException(`${item.strain.name} is not active`);
      }

      if (item.quantity > item.strain.strainLocations[0].stockQuantity) {
        throw new ConflictException(
          `${item.strain.name} does not enough quantity`
        );
      }
      const leftStockQuantity = item.strain.stockQuantity - item.quantity;
      const leftStockQuantityOnLocation =
        item.strain.strainLocations[0].stockQuantity - item.quantity;
      updatedStrainQuantity.push({
        strainId: item.strainId,
        stockQuantity: leftStockQuantity,
        locationId: item.strain.strainLocations[0].locationId,
        isAvailable: leftStockQuantity === 0 ? false : undefined,
        availabilityOnLocation:
          leftStockQuantityOnLocation == 0 ? false : undefined,
        locationStockQuantity: leftStockQuantityOnLocation,
      });
      amount += Number(item.strain.retailPrice * item.quantity);
      profit += Number(
        item.strain.retailPrice * item.quantity -
          item.strain.wholeSalePrice * item.quantity
      );
      delete item.strain;
    }

    return {
      updatedStrainQuantity,
      amount,
      profit,
    };
  }

  async getAllOrders(
    req,
    loginType: LOGIN_TYPE,
    query: GetAllOrderDto,
    tokenId: number
  ) {
    try {
      const { id, role, primaryNftId } = req.user;
      if (
        loginType == LOGIN_TYPE.ADMIN &&
        role === Role.SUBADMIN &&
        !(await this.userRepository.getUserPermission({
          userId: id,
          permission: {
            in: [PermissionType.SalesAndOrderTracking],
          },
        }))
      ) {
        throw new UnauthorizedException(MESSAGES.ERROR.UNAUTHORIZED_ACTION);
      }
      let where: Prisma.OrderWhereInput = {};
      if (loginType == LOGIN_TYPE.ADMIN && tokenId) {
        where.nft = {
          tokenId,
        };
      } else if (loginType == LOGIN_TYPE.DAPP && primaryNftId) {
        where.nftId = primaryNftId;
      }

      if (query.startDate && query.endDate) {
        query.endDate.setDate(query.endDate.getDate() + 1);
        where.createdAt = {
          gte: query.startDate,
          lte: query.endDate,
        };
      }

      if (query.clientIds) {
        where.clientId = {
          in: query.clientIds,
        };
      }
      if (query.search) {
        if (query.searchBy === OrderSearch.clientName) {
          where = await this.searchByClientName(where, query.search);
        }
      }

      if (query.status) {
        where.orderStatus = query.status;
      }

      if (query.paymentStatus) {
        where.paymentStatus = query.paymentStatus;
      }

      if (query.adminApproval) {
        where.adminApproval = query.adminApproval;
      }

      const { orders, count } = await this.getAllOrdersWithoutCommissions(
        where,
        query
      );

      return {
        orders,
        paginationCount: count,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async searchByClientName(where: Prisma.OrderWhereInput, search: string) {
    const searchTerms = search.split(" ");
    if (searchTerms.length === 2) {
      const [firstName, lastName] = searchTerms;
      where.client = {
        AND: [
          { firstName: { contains: firstName, mode: "insensitive" } },
          { lastName: { contains: lastName, mode: "insensitive" } },
        ],
      };
    } else {
      where.client = {
        OR: [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      };
    }
    return where;
  }

  async getAllOrdersWithoutCommissions(
    where: Prisma.OrderWhereInput,
    query: GetAllOrderDto
  ) {
    try {
      const orderBy: Prisma.OrderOrderByWithRelationInput = {};
      if (query.adminApproval === AdminApprovalOnOrder.VERIFIED) {
        orderBy.verifiedAt = query.orderBy
          ? { sort: query.orderBy, nulls: "last" }
          : { sort: Prisma.SortOrder.desc, nulls: "last" };
      } else if (query.adminApproval === AdminApprovalOnOrder.REJECTED) {
        orderBy.rejectedAt = query.orderBy
          ? { sort: query.orderBy, nulls: "last" }
          : { sort: Prisma.SortOrder.desc, nulls: "last" };
      } else {
        orderBy.createdAt = query.orderBy
          ? query.orderBy
          : Prisma.SortOrder.desc;
      }
      const { orders, count } = await this.orderRepository.getAllOrders({
        where,
        select: {
          id: true,
          invoiceNumber: true,
          orderStatus: true,
          adminApproval: true,
          paymentStatus: true,
          totalAmount: true,
          transactions: {
            where: { status: TransactionStatus.COMPLETED },
            select: { method: true },
          },
          rejectionNote:
            query?.adminApproval &&
            query?.adminApproval == AdminApprovalOnOrder.REJECTED
              ? true
              : false,
          orderLogs:
            query?.adminApproval &&
            query?.adminApproval == AdminApprovalOnClient.VERIFIED
              ? {
                  where: { activity: OrderActivity.Approved },
                  select: { activity: true, createdAt: true },
                }
              : false,
          createdAt: true,
          nft: { select: { tokenId: true, ownerId: true } },
          client: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          orderLines: {
            select: { id: true, orderId: true, quantity: true, strain: true },
          },
          _count: { select: { orderLines: true } },
        },
        orderBy,
        skip: query.skip,
        take: query.take,
      });

      orders.forEach((order) => {
        let totalQuantity = 0;
        let totalPrice = 0;
        order.orderLines.forEach((line) => {
          totalQuantity += line.quantity;
          totalPrice += line.quantity * line.strain.retailPrice;
        });
        order.totalQuantity = totalQuantity;
        order.totalPrice = totalPrice;
        delete order.orderLines;
      });
      return { orders, count };
    } catch (error) {
      throw error;
    }
  }

  async getOrderByClientId(
    clientId: string,
    query: GetAllOrderDto,
    user: User
  ) {
    try {
      const { status } = query;
      const { orders, count } = await this.orderRepository.getAllOrders({
        where: {
          clientId,
          orderStatus: status ? status : undefined,
          nftId: user.primaryNftId,
        },
        orderBy: { createdAt: query.orderBy },
        skip: query.skip,
        take: query.take,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          paymentStatus: true,
          orderStatus: true,
          invoiceNumber: true,
          totalAmount: true,
          orderLines: {
            select: {
              quantity: true,
              strain: {
                select: {
                  id: true,
                  imageUrl: true,
                  retailPrice: true,
                },
              },
            },
          },
        },
      });

      orders.forEach((order) => {
        let totalQuantity = 0;
        let totalPrice = 0;
        order.orderLines.forEach((line) => {
          totalQuantity += line.quantity;
          totalPrice += line.strain.retailPrice;
        });
        order.totalOrdered = order.orderLines.length;
        order.totalQuantity = totalQuantity;
        order.totalPrice = totalPrice;
        delete order.orderLines;
      });

      return {
        orders,
        paginationCount: count,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getRecentOrders(query: PaginationDto, user: User) {
    try {
      const { orders, count } = await this.orderRepository.getAllOrders({
        where: {
          nftId: user.primaryNftId,
        },
        orderBy: { createdAt: Prisma.SortOrder.desc },
        skip: query.skip,
        take: query.take,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          paymentStatus: true,
          orderStatus: true,
          client: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              shippings: {
                select: {
                  id: true,
                  address1: true,
                  address2: true,
                  landmark: true,
                  city: true,
                  state: true,
                  country: true,
                  countryCode: true,
                  postalCode: true,
                  createdAt: true,
                },
              },
            },
          },
          orderLines: {
            select: {
              quantity: true,
              createdAt: true,
              id: true,
              strain: {
                select: {
                  retailPrice: true,
                  id: true,
                },
              },
            },
          },
        },
      });

      orders.forEach((order) => {
        let totalQuantity = 0;
        let totalPrice = 0;
        order.orderLines.forEach((line) => {
          totalQuantity += line.quantity;
          totalPrice += line.quantity * line.strain.retailPrice;
        });
        order.totalQuantity = totalQuantity;
        order.shippings = order?.client?.shippings;
        order.totalPrice = totalPrice;
        delete order.orderLines;
      });

      return {
        recentOrders: orders,
        paginationCount: count,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async updateOrdersStatus(req, body: UpdateOrdersStatusDto) {
    try {
      const { id, role } = req.user;
      const { orderUpdates } = body;

      if (
        role === Role.SUBADMIN &&
        !(await this.userRepository.getUserPermission({
          userId: id,
          permission: {
            in: [PermissionType.SalesAndOrderTracking],
          },
        }))
      ) {
        throw new UnauthorizedException(MESSAGES.ERROR.UNAUTHORIZED_ACTION);
      }

      const orderIds = orderUpdates.map((update) => update.orderId);
      const { orders } = await this.orderRepository.getAllOrders({
        where: {
          id: { in: orderIds },
        },
        select: {
          id: true,
          adminApproval: true,
          paymentStatus: true,
          orderStatus: true,
          totalAmount: true,
          agentProfit: true,
          nft: { select: { owner: true, tokenId: true } },
          client: { select: { firstName: true, email: true } },
        },
      });

      if (!orders.length) {
        throw new BadRequestException(MESSAGES.ERROR.ORDER.NOT_FOUND);
      }

      for (const orderUpdate of orderUpdates) {
        const { orderId, paymentStatus, orderStatus } = orderUpdate;
        const order = orders.find((order) => order.id === orderId);

        if (!order) {
          throw new BadRequestException(MESSAGES.ERROR.ORDER.NOT_FOUND);
        }

        const data: Prisma.OrderUncheckedUpdateInput = {};
        this.handleOrderStatusChange(id, orderId, order, orderStatus, data);
        await this.handlePaymentStatusChange(id, paymentStatus, order, data);
        await this.orderRepository.updateOrder({
          where: {
            id: orderId,
          },
          data,
          select: { client: { select: { firstName: true, email: true } } },
        });
        this.sendEmailByOrderStatus(
          {
            firstName: order.client.firstName,
            email: order.client.email,
          },
          orderStatus
        );
      }

      return MESSAGES.SUCCESS.DEFAULT;
    } catch (error) {
      throw error;
    }
  }

  async updateOrderStatus(req, orderId: string, body: updateOrderStatusDto) {
    try {
      const { id, role } = req.user;
      const { isApproved, paymentStatus, orderStatus, rejectionNote } = body;
      if (
        role === Role.SUBADMIN &&
        !(await this.userRepository.getUserPermission({
          userId: id,
          permission: {
            in: [PermissionType.SalesAndOrderTracking],
          },
        }))
      ) {
        throw new UnauthorizedException(MESSAGES.ERROR.UNAUTHORIZED_ACTION);
      }
      const order = await this.orderRepository.getOrder({
        where: {
          id: orderId,
        },
        select: {
          id: true,
          adminApproval: true,
          paymentStatus: true,
          orderStatus: true,
          totalAmount: true,
          agentProfit: true,
          nft: { select: { owner: true, tokenId: true } },
          client: { select: { firstName: true, email: true } },
        },
      });
      if (!order) {
        throw new BadRequestException(MESSAGES.ERROR.ORDER.NOT_FOUND);
      }
      const data: Prisma.OrderUncheckedUpdateInput = {};
      this.handleOrderStatusChange(id, orderId, order, orderStatus, data);
      const { title, message } = this.handleAdminApproval(
        id,
        isApproved,
        rejectionNote,
        data
      );
      await this.handlePaymentStatusChange(id, paymentStatus, order, data);
      await this.orderRepository.updateOrder({
        where: {
          id: orderId,
        },
        data,
      });
      if (isApproved) {
        this.paymentService.createCryptoInvoice(
          {
            orderId: orderId,
            orderAmount: order.totalAmount,
            clientEmail: order.client.email,
          },
          undefined
        );
        this.notificationService.sendUserNotification({
          orderId: orderId,
          title,
          message,
          eventId: undefined,
          clientId: undefined,
          userId: undefined,
        });
      }
      this.sendEmailByOrderStatus(
        { firstName: order.client.firstName, email: order.client.email },
        orderStatus
      );
      return MESSAGES.SUCCESS.DEFAULT;
    } catch (error) {
      throw error;
    }
  }

  async approveOrders(req, body: OrdersApprovalDto) {
    try {
      const { id, role } = req.user;
      const { orderIds } = body;
      const { orderLogs, orderData } =
        await this.checkSubAdminPermissionAndOrderExistance(
          id,
          role,
          orderIds,
          OrderActivity.Approved
        );
      const title = CONSTANT.NOTIFICATION.ORDER_VERIFIED.TITLE;
      const message = CONSTANT.NOTIFICATION.ORDER_VERIFIED.MESSAGE;
      await this.orderRepository.updateOrdersApproval({
        where: { id: { in: orderIds } },
        data: {
          adminApproval: AdminApprovalOnOrder.VERIFIED,
          verifiedAt: new Date(),
        },
      });
      await this.orderRepository.createOrderLogs({ data: orderLogs });

      for (let i = 0; i < orderData.length; i++) {
        this.paymentService.createCryptoInvoice(
          {
            orderId: orderData[i].orderId,
            orderAmount: orderData[i].orderAmount,
            clientEmail: orderData[i].clientEmail,
          },
          undefined
        );
        this.notificationService.sendUserNotification({
          orderId: orderData[i].orderId,
          title,
          message,
          eventId: undefined,
          clientId: undefined,
          userId: undefined,
        });
      }
      return MESSAGES.SUCCESS.DEFAULT;
    } catch (error) {
      throw error;
    }
  }

  async rejectOrders(req, body: OrdersRejectionDto) {
    try {
      const { id, role } = req.user;
      const { orderIds, rejectionNote } = body;
      const { orderLogs } = await this.checkSubAdminPermissionAndOrderExistance(
        id,
        role,
        orderIds,
        OrderActivity.Rejected
      );
      const title = CONSTANT.NOTIFICATION.ORDER_REJECTED.TITLE;
      const message = CONSTANT.NOTIFICATION.ORDER_REJECTED.MESSAGE;
      await this.orderRepository.updateOrdersApproval({
        where: { id: { in: orderIds } },
        data: {
          adminApproval: AdminApprovalOnOrder.REJECTED,
          rejectionNote,
          rejectedAt: new Date(),
        },
      });
      await this.orderRepository.createOrderLogs({ data: orderLogs });
      for (let i = 0; i < orderIds.length; i++) {
        this.notificationService.sendUserNotification({
          orderId: orderIds[i],
          title,
          message,
          eventId: undefined,
          clientId: undefined,
          userId: undefined,
        });
      }
      return MESSAGES.SUCCESS.DEFAULT;
    } catch (error) {
      throw error;
    }
  }

  private async checkSubAdminPermissionAndOrderExistance(
    userId: string,
    role: Role,
    orderIds: string[],
    orderActivity: OrderActivity
  ) {
    try {
      let orderLogs: Prisma.OrderLogsCreateManyInput[] = [];
      let orderData: {
        orderId: string;
        orderAmount: number;
        clientEmail: string;
        firstName: string;
      }[] = [];
      if (
        role === Role.SUBADMIN &&
        !(await this.userRepository.getUserPermission({
          userId,
          permission: {
            in: [PermissionType.SalesAndOrderTracking],
          },
        }))
      ) {
        throw new UnauthorizedException(MESSAGES.ERROR.UNAUTHORIZED_ACTION);
      }
      for (let i = 0; i < orderIds.length; i++) {
        const order = await this.orderRepository.getOrder({
          where: {
            id: orderIds[i],
          },
          select: {
            id: true,
            adminApproval: true,
            paymentStatus: true,
            orderStatus: true,
            totalAmount: true,
            agentProfit: true,
            client: { select: { firstName: true, email: true } },
            nft: { select: { owner: true, tokenId: true } },
          },
        });
        if (!order) {
          throw new BadRequestException(MESSAGES.ERROR.ORDER.NOT_FOUND);
        }
        orderData.push({
          orderId: orderIds[i],
          orderAmount: order.totalAmount,
          clientEmail: order.client.email,
          firstName: order.client.firstName,
        });
        orderLogs.push({
          userId,
          orderId: orderIds[i],
          activity: orderActivity,
        });
      }
      return { orderLogs, orderData };
    } catch (error) {
      throw error;
    }
  }

  async getOrderById(req, clientId: string, orderId: string) {
    try {
      const order = await this.orderRepository.getOrder({
        where: {
          id: orderId,
          clientId,
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          invoiceNumber: true,
          orderStatus: true,
          paymentStatus: true,
          totalAmount: true,
          transactions: {
            where: { status: TransactionStatus.COMPLETED },
            select: {
              method: true,
            },
          },
          nft: { select: { tokenId: true, ownerId: true } },
          client: {
            select: {
              id: true,
              shippings: {
                select: {
                  id: true,
                  address1: true,
                  address2: true,
                  landmark: true,
                  city: true,
                  state: true,
                  country: true,
                  countryCode: true,
                  postalCode: true,
                  createdAt: true,
                },
              },
            },
          },
          orderLines: {
            select: {
              quantity: true,
              strain: {
                select: {
                  id: true,
                  name: true,
                  imageUrl: true,
                  description: true,
                  wholeSalePrice: true,
                  retailPrice: true,
                },
              },
            },
          },
        },
      });

      let totalRetailPrice = 0;
      let totalWholeSalePrice = 0;
      let totalQuantity = 0;

      order?.orderLines.forEach((line) => {
        totalRetailPrice += line.strain.retailPrice * line.quantity;
        totalWholeSalePrice += line.strain.wholeSalePrice * line.quantity;
        totalQuantity += line.quantity;
        line.productAmount = Number(line.strain.retailPrice * line.quantity);
        line.productProfit = Number(
          line.productAmount - line.strain.wholeSalePrice * line.quantity
        );
      });
      if (order) {
        order.totalAmount = totalRetailPrice;
        order.deliveryFee = CONSTANT.DELIVERY_CHARGE;
        order.totalProfit = Number(totalRetailPrice - totalWholeSalePrice);
        order.totalOrdered = order.orderLines.length;
        order.totalQuantity = totalQuantity;
      }

      return { orderDetails: order };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getOrdersSummary(req, loginType: LOGIN_TYPE) {
    try {
      const { id, primaryNftId, role } = req.user;
      if (
        loginType == LOGIN_TYPE.ADMIN &&
        role == Role.SUBADMIN &&
        !(await this.userRepository.getUserPermission({
          userId: id,
          AND: [{ permission: { in: [PermissionType.SalesAndOrderTracking] } }],
        }))
      ) {
        throw new UnauthorizedException(MESSAGES.ERROR.ACCESS_DENIED);
      }
      const where: Prisma.OrderWhereInput = {};
      if (loginType == LOGIN_TYPE.DAPP && primaryNftId) {
        where.nftId = primaryNftId;
      }
      const { summary, count } = await this.orderRepository.groupByOrders({
        by: ["adminApproval"],
        _count: {
          adminApproval: true,
        },
        where,
      });

      const clientSummary = {
        [AdminApprovalOnOrder.PENDING]: 0,
        [AdminApprovalOnOrder.VERIFIED]: 0,
        [AdminApprovalOnOrder.REJECTED]: 0,
        totalCount: count,
      };

      summary.map((item) => {
        const { adminApproval, _count } = item;
        clientSummary[adminApproval] = _count.adminApproval;
        return true;
      });

      return { summary: clientSummary };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getOrdersChartData(
    req,
    loginType: LOGIN_TYPE,
    query: filterByClientsDto
  ) {
    try {
      const { id, primaryNftId } = req.user;
      let { startDate, endDate, clientIds } = query;
      const parameter = this.utilsService.getScaleParameter(startDate, endDate);
      const data: any = await this.orderRepository.getOrdersChartData(
        loginType == LOGIN_TYPE.DAPP ? primaryNftId : undefined,
        startDate,
        endDate,
        parameter,
        clientIds
      );
      return data.map((obj, index) => {
        return {
          name: this.utilsService.getDayFromDate(obj.range, index, parameter),
          value: obj.data,
          date: obj.range,
        };
      });
    } catch (error) {
      throw error;
    }
  }

  async getOrdersStatusBreakdown(
    req,
    loginType: LOGIN_TYPE,
    query: filterByClientsDto
  ) {
    try {
      const { id, primaryNftId } = req.user;
      let { startDate, endDate, clientIds } = query;
      const data = await this.orderRepository.getOrdersStatusBreakdown(
        loginType == LOGIN_TYPE.DAPP ? primaryNftId : undefined,
        startDate,
        endDate,
        clientIds
      );
      const formattedResult = data.map((item: any) => ({
        name: item.status,
        value: parseFloat(item.percentage),
      }));
      return formattedResult;
    } catch (error) {
      throw error;
    }
  }

  async updateCommissionStatus(req, body: CommissionStatusDto) {
    try {
      const { orderIds, isPaid, transactionHash } = body;
      for (let i = 0; i < orderIds.length; i++) {
        if (isPaid) {
          return await this.orderRepository.updateCommissionStatus(
            orderIds[i],
            transactionHash
          );
        } else {
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async getCommissionRecipients(req, body: OrderIdsDto) {
    try {
      const { orderIds } = body;
      const exchangeRates = await this.utilsService.getLatestAmountForUSD([
        "eth",
      ]);
      const { ETH } = exchangeRates;
      const { commissions } = await this.commissionRepository.getAllCommissions(
        {
          where: {
            paymentStatus: PaymentStatus.PENDING,
            orderId: { in: orderIds },
            user: { isActive: true },
          },
          select: {
            orderId: true,
            amountInDollar: true,
            amountInEth: true,
            paymentStatus: true,
            order: {
              select: { nft: { select: { tokenId: true, ownerId: true } } },
            },
            user: {
              select: {
                id: true,
                fullName: true,
                username: true,
                walletAddress: true,
                role: true,
              },
            },
          },
        }
      );
      const updatedCommissions = commissions.map((commission) => {
        commission.amountInEth = parseFloat(
          (commission.amountInDollar * ETH).toFixed(6)
        );
        return commission;
      });

      return updatedCommissions;
    } catch (error) {
      throw error;
    }
  }

  private sendEmailByOrderStatus(
    { firstName, email }: { firstName: string; email: string },
    orderStatus: OrderStatus
  ) {
    if (orderStatus === OrderStatus.PROCESSING) {
      this.emailService.sendEmail({
        data: { payload: { userName: firstName } },
        to_user: { email: email },
        subject: CONSTANT.EMAIL_SUBJECT.CLIENT_ORDER_PLACED,
        mail_type: CONSTANT.MAIL_TYPE.CLIENT_ORDER_PLACED,
        from_user: null,
        userType: undefined,
      });
    }
    if (orderStatus === OrderStatus.SHIPPED) {
      this.emailService.sendEmail({
        data: { payload: { userName: firstName } },
        to_user: { email: email },
        subject: CONSTANT.EMAIL_SUBJECT.CLIENT_ORDER_SHIPPED,
        mail_type: CONSTANT.MAIL_TYPE.CLIENT_ORDER_SHIPPED,
        from_user: null,
        userType: undefined,
      });
    }
    if (orderStatus === OrderStatus.DELIVERED) {
      this.emailService.sendEmail({
        data: { payload: { userName: firstName } },
        to_user: { email: email },
        subject: CONSTANT.EMAIL_SUBJECT.CLIENT_ORDER_DELIVERED,
        mail_type: CONSTANT.MAIL_TYPE.CLIENT_ORDER_DELIVERED,
        from_user: null,
        userType: undefined,
      });
    }
  }

  private handleOrderStatusChange(
    userId: string,
    orderId: string,
    order,
    orderStatus: OrderStatus,
    data: Prisma.OrderUncheckedUpdateInput
  ) {
    if (order.adminApproval === AdminApprovalOnOrder.VERIFIED && orderStatus) {
      const validStatusTransitions = {
        [OrderStatus.PENDING]: [
          OrderStatus.PROCESSING,
          OrderStatus.SHIPPED,
          OrderStatus.DELIVERED,
        ],
        [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED, OrderStatus.DELIVERED],
        [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
        [OrderStatus.DELIVERED]: [], // No valid transitions from DELIVERED
      };
      const statusToActivityMap = {
        [OrderStatus.PROCESSING]: OrderActivity.Processing,
        [OrderStatus.SHIPPED]: OrderActivity.Shipped,
        [OrderStatus.DELIVERED]: OrderActivity.Delivered,
      };
      const allowedTransitions = validStatusTransitions[order.orderStatus];
      if (allowedTransitions && !allowedTransitions.includes(orderStatus)) {
        throw new ConflictException(MESSAGES.ERROR.ORDER.WRONG_ORDER_STATUS);
      }
      data.orderStatus = orderStatus;
      data.orderLogs = {
        create: { userId, activity: statusToActivityMap[orderStatus] },
      };

      if (orderStatus === OrderStatus.DELIVERED) {
        data.sale = {
          update: { where: { orderId }, data: { stage: SaleStage.CLOSED } },
        };
      }
    }
  }

  private handleAdminApproval(
    userId: string,
    isApproved: boolean,
    rejectionNote: string,
    data: Prisma.OrderUncheckedUpdateInput
  ) {
    let title: string;
    let message: string;
    if (isApproved === true) {
      data.adminApproval = AdminApprovalOnOrder.VERIFIED;
      data.verifiedAt = new Date();
      data.orderLogs = { create: { userId, activity: OrderActivity.Approved } };
      title = CONSTANT.NOTIFICATION.ORDER_VERIFIED.TITLE;
      message = CONSTANT.NOTIFICATION.ORDER_VERIFIED.MESSAGE;
    } else if (isApproved === false) {
      data.adminApproval = AdminApprovalOnOrder.REJECTED;
      data.rejectedAt = new Date();
      data.rejectionNote = rejectionNote;
      data.orderLogs = { create: { userId, activity: OrderActivity.Rejected } };
      title = CONSTANT.NOTIFICATION.ORDER_REJECTED.TITLE;
      message = CONSTANT.NOTIFICATION.ORDER_REJECTED.MESSAGE;
    }
    return { title, message };
  }

  private async getNftUsers(tokenId: number) {
    return await this.userRepository.getAllCelebritiesOrAssociatedNFTs({
      where: { tokenId, user: { role: Role.MANAGER, isActive: true } },
      select: {
        nft: {
          select: {
            owner: {
              select: {
                id: true,
                walletAddress: true,
                commissionPercent: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            walletAddress: true,
            commissionPercent: true,
          },
        },
      },
    });
  }

  private calculateCommissions(
    totalProfit: number,
    nftUsers,
    ownerId: string,
    orderId: string
  ) {
    const ordersCommission = [];
    if (nftUsers.data) {
      let totalAgentCommission = 0;
      nftUsers.data.forEach((data) => {
        const commissionAmount =
          (totalProfit * data.user?.commissionPercent) / 100;
        totalAgentCommission += commissionAmount;
        ordersCommission.push({
          userId: data.user.id,
          amountInDollar: commissionAmount,
          paymentStatus: PaymentStatus.PENDING,
        });
      });
      ordersCommission.push({
        userId: ownerId,
        amountInDollar: totalProfit - totalAgentCommission,
        paymentStatus: PaymentStatus.PENDING,
      });
    }
    return ordersCommission;
  }

  private async handlePaymentStatusChange(
    userId: string,
    paymentStatus: string,
    order,
    data: Prisma.OrderUncheckedUpdateInput
  ) {
    if (
      paymentStatus === PaymentStatus.PAID &&
      order.paymentStatus === PaymentStatus.PENDING
    ) {
      const nftUsers = await this.getNftUsers(order.nft.tokenId);
      const ordersCommission = this.calculateCommissions(
        order.agentProfit,
        nftUsers,
        order.nft.owner.id,
        order.id
      );

      data.commission = {
        createMany: { data: ordersCommission, skipDuplicates: true },
      };
      data.paymentStatus = paymentStatus;
      data.orderLogs = {
        create: { userId, activity: OrderActivity.PaymentSuccess },
      };
    }
  }
}
