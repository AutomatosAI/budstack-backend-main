import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreateCryptoInvoiceDto, OrderInvoiceDto } from './dto/request.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // @Post("crypto/invoice")
  // async createCryptoInvoice(@Req() req, @Body() body: OrderInvoiceDto) {
  //   return await this.paymentsService.createCryptoInvoice(body, "Crypto payment invoice");
  // }

  @HttpCode(200)
  @Post("/webhook")
  async cryptoPaymentWebhook(@Req() req) {
    return await this.paymentsService.cryptoPaymentWebhook(req);
  }

  // @Post("fiat/invoice")
  // async createFiatInvoice(@Req() req, @Body() body: OrderInvoiceDto) {
  //   return await this.paymentsService.createFiatInvoice(body);
  // }

  @HttpCode(200)
  @Post("/fiat/webhook")
  async fiatPaymentWebhook(@Req() req) {
    return await this.paymentsService.fiatPaymentWebhook(req);
  }
}
