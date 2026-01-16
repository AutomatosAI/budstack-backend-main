import { Controller, Get, Param, Query, Req, UseGuards } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { GetAllTransactionByClientDto } from "./transaction.dto";
import { AuthGuard } from "@nestjs/passport";
import { ClientIdParams } from "src/client/dto/request.dto";

@Controller("transactions")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
}
