import { Test, TestingModule } from '@nestjs/testing';
import { MinimarketController } from './minimarket.controller';

describe('MinimarketController', () => {
  let controller: MinimarketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinimarketController],
    }).compile();

    controller = module.get<MinimarketController>(MinimarketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
