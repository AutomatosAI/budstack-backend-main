import { Module } from '@nestjs/common';
import { PlanetService } from './planet.service';
import { PlanetController } from './planet.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlanetRepository } from './planet.repository';
import { StrainRepository } from 'src/strain/strain.repository';

@Module({
  controllers: [PlanetController],
  providers: [PlanetService,PrismaService,PlanetRepository, StrainRepository],
})
export class PlanetModule {}
