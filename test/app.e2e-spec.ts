import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
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
    await app.init();
  });

  afterAll(async () => {
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
      token = response.body.data.token;
    });

    it('should get current user', async () => {
      const response = await request(app.getHttpServer())
        .get('/self')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(response.body).toBeDefined();
      expect(response.body.status).toBe('success');
      expect(response.body.data.username).toBe(userCred.username);
      expect(response.body.data.password).toBeUndefined();
      expect(response.body.data.name).toBeDefined();
    });
  });
});
