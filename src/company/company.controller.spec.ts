import { DrizzleModule } from '@/drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

describe('CompanyController', () => {
  let controller: CompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [CompanyService],
      imports: [DrizzleModule, ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
  });

  afterAll(async () => {
    globalThis._client?.end();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
