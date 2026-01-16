import { ForbiddenException, Injectable } from "@nestjs/common";
import { PaymentsRepository } from "./payments.repository";
import { CreateCryptoInvoiceDto, OrderInvoiceDto } from "./dto/request.dto";
import { catchError, firstValueFrom, map } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { configData } from "src/config";
import { API_ROUTES, CONSTANT } from "src/constants/constant";
import { EmailService } from "src/email/email.service";
import { stringify } from "querystring";
import { coinremitter } from "coinremitter-api";
import { MESSAGES } from "src/constants";
import { OrderRepository } from "src/order/order.repository";
import {
  OrderActivity,
  PaymentStatus,
  Prisma,
  Role,
  TransactionStatus,
  TransactionType,
} from "@prisma/client";
import { UtilsService } from "src/utils/utils.service";

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentRepository: PaymentsRepository,
    private readonly orderRepository: OrderRepository,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly utilsSerivce: UtilsService
  ) {}
  config = configData(this.configService);

  async createCryptoInvoice(orderDto: OrderInvoiceDto, description: string) {
    try {
      const { clientEmail, orderId, orderAmount } = orderDto;
      const body = {
        amount: orderAmount + CONSTANT.DELIVERY_CHARGE,
        name: CONSTANT.PAYMENTS.INVOICE.NAME,
        currency: CONSTANT.PAYMENTS.INVOICE.CURRENCY.USD,
        expire_time: CONSTANT.PAYMENTS.INVOICE.EXPIRY_TIME,
        description,
        notify_url: CONSTANT.PAYMENTS.INVOICE.NOTIFY_URL,
        success_url: CONSTANT.PAYMENTS.INVOICE.SUCCESS_URL,
        fail_url: CONSTANT.PAYMENTS.INVOICE.FAIL_URL,
        custom_data1: clientEmail,
        custom_data2: orderId,
      };
      const tcnParam = {
        api_key: this.config.COIN_REMITTER_TEST_API_KEY,
        password: this.config.COIN_REMITTER_TEST_PASSWORD,
      };
      const usdtParam = {
        api_key: this.config.COIN_REMITTER_USDT_API_KEY,
        password: this.config.COIN_REMITTER_USDT_PASSWORD,
      };
      const ethParam = {
        api_key: this.config.COIN_REMITTER_ETH_API_KEY,
        password: this.config.COIN_REMITTER_ETH_PASSWORD,
      };
      const btcParam = {
        api_key: this.config.COIN_REMITTER_BTC_API_KEY,
        password: this.config.COIN_REMITTER_BTC_PASSWORD,
      };
      let tcnInvoiceUrl: string;
      if (this.config.NETWORK == "testnet") {
        tcnInvoiceUrl = await this.createInvoiceByType(
          CONSTANT.PAYMENTS.COIN_REMITTER.INVOICE_TYPE.TCN,
          {
            ...body,
            ...tcnParam,
          }
        );
      }
      const usdtInvoiceUrl = await this.createInvoiceByType(
        CONSTANT.PAYMENTS.COIN_REMITTER.INVOICE_TYPE.USDT,
        {
          ...body,
          ...usdtParam,
        }
      );
      const ethInvoiceUrl = await this.createInvoiceByType(
        CONSTANT.PAYMENTS.COIN_REMITTER.INVOICE_TYPE.ETH,
        {
          ...body,
          ...ethParam,
        }
      );
      const btcInvoiceUrl = await this.createInvoiceByType(
        CONSTANT.PAYMENTS.COIN_REMITTER.INVOICE_TYPE.BTC,
        {
          ...body,
          ...btcParam,
        }
      );
      const fiatInvoiceUrl = await this.createFiatInvoice({
        ...body,
      });

      console.log(
        "Invoice created::",
        tcnInvoiceUrl,
        usdtInvoiceUrl,
        ethInvoiceUrl,
        btcInvoiceUrl,
        fiatInvoiceUrl
      );

      await this.emailService.sendEmail({
        data: {
          payload: {
            orderId,
            orderAmount,
            tcnInvoiceUrl,
            usdtInvoiceUrl,
            ethInvoiceUrl,
            btcInvoiceUrl,
            fiatInvoiceUrl,
          },
        },
        to_user: {
          email: clientEmail,
        },
        subject: CONSTANT.EMAIL_SUBJECT.CLIENT_ORDER_INVOICE,
        mail_type: CONSTANT.MAIL_TYPE.CLIENT_ORDER_INVOICE,
        from_user: null,
        userType: undefined,
      });
      return MESSAGES.SUCCESS.DEFAULT;
    } catch (error) {
      console.log("error:::", error);
      throw error;
    }
  }

  async createInvoiceByType(invoiceType: string, body: any) {
    try {
      const user_agent = "CR@" + "v3" + ",node plugin@" + "1.1.0";
      const response = await firstValueFrom(
        this.httpService
          .post(
            `${this.config.COIN_REMITTER_INVOICE_URL}/${invoiceType}/${API_ROUTES.COIN_REMITTER.CREATE_INVOICE}`,
            stringify(body),
            {
              headers: {
                "User-Agent": user_agent,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .pipe(
            map((res) => res.data),
            catchError((e) => {
              console.log("error:::", e);
              throw new ForbiddenException("API not available");
            })
          )
      );

      const invoice_url = response?.data?.url;
      return invoice_url;
    } catch (error) {
      throw error;
    }
  }

  async cryptoPaymentWebhook(req) {
    try {
      const data = req.body;

      const clientEmail = data.custom_data1;
      const orderId = data.custom_data2;

      let status: TransactionStatus;
      switch (data.status) {
        case "Paid":
          status = TransactionStatus.COMPLETED;
          break;
        case "Pending":
          status = TransactionStatus.PENDING;
          break;
        case "Cancelled":
          status = TransactionStatus.CANCELED;
          break;
        case "Under paid":
          status = TransactionStatus.UNDERPAID;
          break;
        case "Overpaid":
          status = TransactionStatus.OVERPAID;
          break;
        case "Expired":
          status = TransactionStatus.EXPIRED;
          break;
        default:
          status = TransactionStatus.PENDING;
      }

      const updateData: Prisma.OrderUncheckedUpdateInput = {
        transactions: {
          create: {
            client: { connect: { email: clientEmail } },
            method: TransactionType.CRYPTO,
            invoice: data.invoice_id,
            amount: Number(data.usd_amount),
            status,
            currencyType: data.coin,
            destination: data.address,
            description: data.description,
          },
        },
      };
      if (
        orderId &&
        (data.status_code == 1 ||
          data.status_code == 2 ||
          data.status_code == 3)
      ) {
        updateData.invoiceNumber = data.invoice_id;
        updateData.paymentStatus = PaymentStatus.PAID;
        const order = await this.orderRepository.getOrder({
          where: { id: orderId },
          select: {
            clientId: true,
            shipping: true,
            orderLines: {
              select: { strain: { select: { name: true } }, quantity: true },
            },
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                shippings: true,
              },
            },
          },
        });

        this.emailService.sendEmail({
          data: {
            payload: {
              fullName: `${order.client.firstName} ${order.client.lastName}`,
              clientId: order.clientId,
              orderId: orderId,
              orderDate: order.createdAt.toISOString(),
              addressLine1: order.shipping.address1,
              addressLine2: order.shipping.address2,
              city: order.shipping.city,
              postCode: order.shipping.postalCode,
              country: order.shipping.country,
              productName1: order.orderLines[0].strain.name,
              product1Quantity: order.orderLines[0].quantity,
              productName2:
                order.orderLines[1] ?? order.orderLines[1].strain.name,
              product2Quantity:
                order.orderLines[1] ?? order.orderLines[1].quantity,
            },
          },
          to_user: { email: CONSTANT.ADMIN_ORDER_MONITORING_EMAIL },
          subject:
            CONSTANT.EMAIL_SUBJECT.CLIENT_ORDER_PAYMENT_RECEIVED(orderId),
          mail_type: CONSTANT.MAIL_TYPE.CLIENT_ORDER_PAYMENT_RECEIVED,
          from_user: null,
          userType: undefined,
        });
      } else {
        updateData.paymentStatus = PaymentStatus.PENDING;
      }
      await this.orderRepository.updateOrder({
        where: { id: orderId },
        data: updateData,
      });
      return "success";
    } catch (error) {
      return "error";
    }
  }

  async createFiatInvoice(body: any) {
    try {
      // console.log("body::", body);
      const nonce = this.utilsSerivce.generateNonce().toString();

      const parameters = {
        currency_code: "USD",
        amount: body.amount ? body.amount : body.orderAmount,
        details: "Fiat Payment Invoice",
        custom: nonce,
        web_hook: CONSTANT.PAYMENTS.PAYINN_API.WEBHOOK_URL,
        success_url: CONSTANT.PAYMENTS.PAYINN_API.SUCCESS_URL,
        cancel_url: CONSTANT.PAYMENTS.PAYINN_API.FAIL_URL,
        customer_email: body.custom_data1
          ? body.custom_data1
          : body.clientEmail,
      };

      const user_agent = "CR@" + "v3" + ",node plugin@" + "1.1.0";
      const headers = {
        "User-Agent": user_agent,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Authorization: `Bearer ${this.config.PAYINN_API_KEY}`,
      };

      const formBody = new URLSearchParams(parameters).toString();
      const url = `${this.config.PAYINN_API_URL}/${CONSTANT.PAYMENTS.PAYINN_API.CREATE_INVOICE}`;

      try {
        const response = await firstValueFrom(
          this.httpService.post(url, formBody, { headers })
        );
        await this.orderRepository.updateOrder({
          where: {
            id: body.custom_data2 ? body.custom_data2 : body.orderId,
          },
          data: {
            nonce: nonce,
            invoiceNumber: response.data.payment_id,
          },
        });
        return response.data.url;
      } catch (e) {
        console.error("Error creating invoice:", e);
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
      throw error;
    }
  }

  async fiatPaymentWebhook(req) {
    try {
      const data = req.body;
      const nonce = data.custom;

      const order = await this.orderRepository.getOrder({
        where: {
          nonce: nonce,
        },
        select: {
          id: true,
          adminApproval: true,
          paymentStatus: true,
          orderStatus: true,
          totalAmount: true,
          agentProfit: true,
          clientId: true,
          shipping: true,
          createdAt: true,
          orderLines: {
            select: { strain: { select: { name: true } }, quantity: true },
          },
          client: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              shippings: true,
            },
          },
        },
      });
      if (!order) {
        return "Success";
      }

      const orderId = order.id;

      const clientEmail = order.client.email;

      let status: TransactionStatus;
      if (data.status == "OK") {
        status = TransactionStatus.COMPLETED;
      } else {
        status = TransactionStatus.FAILED;
      }

      const updateData: Prisma.OrderUncheckedUpdateInput = {
        transactions: {
          create: {
            client: { connect: { email: clientEmail } },
            method: TransactionType.FIAT,
            invoice: data.payment_id,
            amount: Number(data.amount),
            status,
            currencyType: data.currency,
            destination: data.address,
            description: data.description,
          },
        },
        nonce: null,
      };

      if (orderId && data.code == 200) {
        updateData.invoiceNumber = data.payment_id;
        updateData.paymentStatus = PaymentStatus.PAID;
      } else {
        updateData.paymentStatus = PaymentStatus.PENDING;
      }
      await this.orderRepository.updateOrder({
        where: { id: orderId },
        data: updateData,
      });

      if (orderId && data.code == 200) {
        this.emailService.sendEmail({
          data: {
            payload: {
              fullName: `${order.client.firstName} ${order.client.lastName}`,
              clientId: order.clientId,
              orderId: orderId,
              orderDate: order.createdAt.toISOString(),
              addressLine1: order.shipping.address1,
              addressLine2: order.shipping.address2,
              city: order.shipping.city,
              postCode: order.shipping.postalCode,
              country: order.shipping.country,
              productName1: order.orderLines[0].strain.name,
              product1Quantity: order.orderLines[0].quantity,
              productName2: order.orderLines[1]
                ? order.orderLines[1].strain.name
                : undefined,
              product2Quantity: order.orderLines[1]
                ? order.orderLines[1].quantity
                : undefined,
            },
          },
          to_user: { email: CONSTANT.ADMIN_ORDER_MONITORING_EMAIL },
          subject:
            CONSTANT.EMAIL_SUBJECT.CLIENT_ORDER_PAYMENT_RECEIVED(orderId),
          mail_type: CONSTANT.MAIL_TYPE.CLIENT_ORDER_PAYMENT_RECEIVED,
          from_user: null,
          userType: undefined,
        });
      }

      return "success";
    } catch (error) {
      return "error";
    }
  }
}
