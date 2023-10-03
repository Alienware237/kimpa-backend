import { Test, TestingModule } from '@nestjs/testing';
import { AdministratorController } from '../../Modules/administrator/administrator.controller';
import { AdministratorService } from '../../Modules/administrator/administrator.service';

describe('AdministratorController', () => {
  let controller: AdministratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministratorController],
      providers: [AdministratorService],
    }).compile();

    controller = module.get<AdministratorController>(AdministratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
