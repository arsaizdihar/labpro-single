import { Drizzle, DrizzleType } from '@/drizzle/drizzle.provider';
import { runSeed } from '@/drizzle/script/seed';
import { HttpExceptionFilter } from '@/http/http-exception.filter';
import { ResponseInterceptor } from '@/http/response-interceptor';
import { ZodValidationExceptionFilter } from '@/http/zod-exception.filter';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController', () => {
  let app: INestApplication;
  let db: DrizzleType;
  let token = '';
  let perusahaan_id = '';
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

  describe('perusahaan', () => {
    it('should error create perusahaan', async () => {
      await request(app.getHttpServer())
        .post('/perusahaan')
        .set('Authorization', token)
        .send({})
        .expect(400);
    });

    it('should create perusahaan', async () => {
      const response = await request(app.getHttpServer())
        .post('/perusahaan')
        .send({
          nama: 'perusahaan',
          alamat: 'alamat',
          no_telp: '08123456789',
          kode: 'ABC',
        })
        .set('Authorization', token)
        .expect(201);
      expect(response.body).toBeDefined();
      const data = response.body.data;
      expect(data).toBeDefined();
      expect(data.id).toBeDefined();
      perusahaan_id = data.id;
    });

    it('should get all perusahaan and by id', async () => {
      const responseAll = await request(app.getHttpServer())
        .get('/perusahaan')
        .set('Authorization', token)
        .expect(200);
      expect(responseAll.body).toBeDefined();
      const companies = responseAll.body.data;
      expect(companies).toBeDefined();
      expect(companies.length).toBeGreaterThan(0);

      const responseOne = await request(app.getHttpServer())
        .get(`/perusahaan/${companies[0].id}`)
        .set('Authorization', token)
        .expect(200);
      expect(responseOne.body).toBeDefined();
      const company = responseOne.body.data;
      expect(company).toBeDefined();
      expect(company.id).toBe(companies[0].id);
    });

    it('should update perusahaan', async () => {
      const response = await request(app.getHttpServer())
        .put(`/perusahaan/${perusahaan_id}`)
        .send({ nama: 'perusahaan baru' })
        .set('Authorization', token)
        .expect(200);
      expect(response.body).toBeDefined();
      expect(response.body.data).toBeDefined();
    });

    it('should delete perusahaan', async () => {
      const response = await request(app.getHttpServer())
        .post('/perusahaan')
        .send({
          nama: 'perusahaan2',
          alamat: 'alamat',
          no_telp: '08123456789',
          kode: 'ABD',
        })
        .set('Authorization', token)
        .expect(201);
      const id = response.body.data.id;
      await request(app.getHttpServer())
        .delete(`/perusahaan/${id}`)
        .set('Authorization', token)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/perusahaan/${id}`)
        .set('Authorization', token)
        .expect(404);
    });
  });

  describe('Barang', () => {
    it('should error create barang', async () => {
      await request(app.getHttpServer())
        .post('/barang')
        .set('Authorization', token)
        .send({})
        .expect(400);
    });

    it('should create barang', async () => {
      const response = await request(app.getHttpServer())
        .post('/barang')
        .send({
          nama: 'barang',
          harga: 1000,
          stok: 10,
          perusahaan_id,
          kode: 'ABC',
        })
        .set('Authorization', token)
        .expect(201);
      expect(response.body).toBeDefined();
      expect(response.body.data).toBeDefined();
    });

    let itemId: string;

    it('should get all barang and by id', async () => {
      const responseAll = await request(app.getHttpServer())
        .get('/barang')
        .set('Authorization', token)
        .expect(200);
      expect(responseAll.body).toBeDefined();
      const items = responseAll.body.data;
      expect(items).toBeDefined();
      expect(items.length).toBeGreaterThan(0);
      const responseOne = await request(app.getHttpServer())
        .get(`/barang/${items[0].id}`)
        .set('Authorization', token)
        .expect(200);
      expect(responseOne.body).toBeDefined();
      const item = responseOne.body.data;
      expect(item).toBeDefined();
      expect(item.id).toBe(items[0].id);
      itemId = item.id;
    });

    it('should update barang', async () => {
      const response = await request(app.getHttpServer())
        .put(`/barang/${itemId}`)
        .send({ nama: 'barang baru' })
        .set('Authorization', token)
        .expect(200);
      expect(response.body).toBeDefined();
      expect(response.body.data).toBeDefined();
    });

    it('should get barang count', async () => {
      const response = await request(app.getHttpServer())
        .get('/barang/count')
        .set('Authorization', token)
        .expect(200);
      expect(response.body).toBeDefined();
      expect(response.body.data).toBeDefined();
      expect(response.body.data).toBeGreaterThan(0);
    });
  });
});
