import { DrizzleModule } from '@/drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemService],
      imports: [DrizzleModule, ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    service = module.get<ItemService>(ItemService);
  });

  afterAll(async () => {
    globalThis._client?.end();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
