import { Drizzle, DrizzleType } from '@/drizzle/drizzle.provider';
import { runSeed } from '@/drizzle/script/seed';
import { HttpExceptionFilter } from '@/http/http-exception.filter';
import { ResponseInterceptor } from '@/http/response-interceptor';
import { ZodValidationExceptionFilter } from '@/http/zod-exception.filter';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let db: DrizzleType;
  let token = '';
  const userCred = {
    username: 'admin',
    password: 'admin1234',
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(
      new HttpExceptionFilter(),
      new ZodValidationExceptionFilter(),
    );
    app.useGlobalInterceptors(new ResponseInterceptor());
    db = app.get<DrizzleType>(Drizzle);
    await runSeed(db);
    await app.init();
  });

  afterAll(async () => {
    await db.end?.();
    await app.close();
  });

  describe('Auth', () => {
    it('should error login', async () => {
      return request(app.getHttpServer())
        .post('/login')
        .send({ username: 'admin' })
        .expect(400);
    });
    it('should login', async () => {
      const response = await request(app.getHttpServer())
        .post('/login')
        .send(userCred)
        .expect(200);
      expect(response.body).toBeDefined();
      expect(response.body.status).toBe('success');
      expect(response.body.data.token).toBeDefined();
      expect(response.body.data.user).toBeDefined();
      token = response.body.data.token;
    });

    it('should get current user', async () => {
      const response = await request(app.getHttpServer())
        .get('/self')
        .set('Authorization', token)
        .expect(200);
      expect(response.body).toBeDefined();
      expect(response.body.status).toBe('success');
      expect(response.body.data.username).toBe(userCred.username);
      expect(response.body.data.password).toBeUndefined();
      expect(response.body.data.name).toBeDefined();
    });
  });
});
