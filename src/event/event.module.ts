import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventRepository } from './event.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
   imports: [
      HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
    
    ],
  controllers: [EventController],
  providers: [EventService,EventRepository,PrismaService,UtilsService,JwtService,EmailService],
})
export class EventModule {}
