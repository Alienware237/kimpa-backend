import { Test, TestingModule } from '@nestjs/testing';
import { MailControllerController } from './mail-controller.controller';

describe('MailControllerController', () => {
  let controller: MailControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailControllerController],
    }).compile();

    controller = module.get<MailControllerController>(MailControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
