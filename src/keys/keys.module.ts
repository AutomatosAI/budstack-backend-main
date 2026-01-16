import { Module } from '@nestjs/common';
import { KeysService } from './keys.service';
import { KeysController } from './keys.controller';
import { KeysRepository } from './keys.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [KeysController],
  providers: [KeysService, KeysRepository, PrismaService],
})
export class KeysModule {}
