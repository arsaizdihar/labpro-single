import { DrizzleModule } from '@/drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';

describe('CompanyService', () => {
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyService],
      imports: [DrizzleModule, ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  afterAll(async () => {
    globalThis._client?.end();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
