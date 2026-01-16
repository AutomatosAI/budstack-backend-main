import { Test, TestingModule } from '@nestjs/testing';
import { StrainController } from './strain.controller';
import { StrainService } from './strain.service';

describe('StrainController', () => {
  let controller: StrainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StrainController],
      providers: [StrainService],
    }).compile();

    controller = module.get<StrainController>(StrainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
