import { Body, Controller, Get, Post, Query, Req } from "@nestjs/common";
import { KycService } from "./kyc.service";
import { CreateIndividualCaseDto } from "./dto/request.dto";
import { Cron, CronExpression } from "@nestjs/schedule";

@Controller("kyc")
export class KycController {
  constructor(private readonly kycService: KycService) {}

  // @Post('login')
  // async kycLogin() {
  //   return await this.kycService.kycLogin();
  // }

  // @Post('')
  // async createCaseForUser(@Body() body: CreateIndividualCaseDto){
  //   return this.kycService.createCaseForUser(body);
  // }

  // @Get('')
  // async getCaseDetailsOfUser(@Query("caseId") caseId: string) {
  //   return this.kycService.getCaseDetailsOfUser(caseId);
  // }

  @Post("/webhook")
  async kycWebhook(@Req() req) {
    return await this.kycService.kycWebhook(req);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cronJobToUpdateKycStatus() {
    return await this.kycService.checkKycStatusAndUpdate();
  }
}
