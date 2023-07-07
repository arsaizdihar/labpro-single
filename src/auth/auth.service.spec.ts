import { DrizzleModule } from '@/drizzle/drizzle.module';
import { Drizzle, DrizzleType } from '@/drizzle/drizzle.provider';
import { runSeed } from '@/drizzle/script/seed';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [AuthService],
      imports: [DrizzleModule, ConfigModule.forRoot({ isGlobal: true })],
    })
      .useMocker((token) => {
        if (token === JwtService) {
          return { sign: jest.fn().mockReturnValue('test') };
        }
      })
      .compile();

    service = module.get<AuthService>(AuthService);
    const db = module.get<DrizzleType>(Drizzle);
    await runSeed(db);
  });

  afterAll(async () => {
    await module.get<DrizzleType>(Drizzle).end();
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return login token', async () => {
    const result = await service.login('admin', 'admin1234');
    expect(result.token).toEqual('test');
  });
});
