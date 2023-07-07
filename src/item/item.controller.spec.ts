import { DrizzleModule } from '@/drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

describe('ItemController', () => {
  let controller: ItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [ItemService],
      imports: [DrizzleModule, ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    controller = module.get<ItemController>(ItemController);
  });

  afterAll(async () => {
    globalThis._client?.end();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
