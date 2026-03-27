import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('smoke: login -> users -> process categories', async () => {
    const loginRes = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'Admin@123456' })
      .expect(201);

    const token = loginRes.body?.token || loginRes.body?.data?.accessToken;
    expect(token).toBeTruthy();

    const usersRes = await request(app.getHttpServer())
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(usersRes.body)).toBe(true);

    const categoriesRes = await request(app.getHttpServer())
      .get('/api/process/categories')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(categoriesRes.body)).toBe(true);
  });
});
