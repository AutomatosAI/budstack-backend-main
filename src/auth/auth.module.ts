import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { UtilsService } from 'src/utils/utils.service';
import { UserRepository } from 'src/user/user.repository';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [HttpModule.register({timeout: 5000, maxRedirects: 5})],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, PrismaService, JwtService, EmailService, UtilsService, UserRepository],
})
export class AuthModule {}
