import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionRepository } from './transaction.repository';
import { UtilsService } from 'src/utils/utils.service';
import { HttpModule } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';

@Module({
   imports: [
        HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
      
      ],
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService, TransactionRepository,UtilsService,JwtService,EmailService],
})
export class TransactionModule {}
