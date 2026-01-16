import { Module } from '@nestjs/common';
import { StrainService } from './strain.service';
import { StrainController } from './strain.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { StrainRepository } from './strain.repository';
import { HttpModule } from '@nestjs/axios';
import { UtilsService } from 'src/utils/utils.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [HttpModule.register({timeout: 5000, maxRedirects: 5})],
  controllers: [StrainController],
  providers: [StrainService,StrainRepository,PrismaService, UtilsService, JwtService, EmailService],
})
export class StrainModule {}
