import { Test, TestingModule } from '@nestjs/testing';
import { MinimarketService } from './minimarket.service';

describe('MinimarketService', () => {
  let service: MinimarketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinimarketService],
    }).compile();

    service = module.get<MinimarketService>(MinimarketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
