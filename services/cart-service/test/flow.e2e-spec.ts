import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ExecutionContext } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { SessionRequiredGuard } from './../src/common/guards/session-required.guard';
import { PrismaService } from './../src/infrastructure/prisma.service';
import { AuthClientService } from './../src/infrastructure/auth.client';
import { CatalogClientService } from './../src/infrastructure/catalog.client';

describe('Cart Service Flow Integration (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const mockGuard = {
    canActivate: (context: ExecutionContext) => {
      const req = context.switchToHttp().getRequest();
      req.userId = 1;
      return true;
    },
  };

  const mockAuthClient = {
    getSession: async (_token?: string) => ({ id: 1 }),
  };

  const mockCatalogClient = {
    getProduct: async (productId: number) => ({ id: productId, name: 'Mock Product' }),
  };

  beforeAll(async () => {
    const builder = Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthClientService)
      .useValue(mockAuthClient)
      .overrideProvider(CatalogClientService)
      .useValue(mockCatalogClient)
      .overrideGuard(SessionRequiredGuard)
      .useValue(mockGuard as any);

    const moduleFixture: TestingModule = await builder.compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalGuards(mockGuard as any);
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);

    await prisma.cartProduct.deleteMany();
    await prisma.cart.deleteMany();
  });

  afterAll(async () => {
    if (prisma) {
      await prisma.cartProduct.deleteMany();
      await prisma.cart.deleteMany();
      await prisma.$disconnect();
    }
    if (app) await app.close();
  });

  it('full flow: create cart -> add product -> list -> delete product -> delete cart', async () => {
    // 1) create cart
    const createRes = await request(app.getHttpServer())
      .post('/carts')
      .send({ userId: 1 })
      .expect(201);

    expect(createRes.body).toBeDefined();
    const cartId: number = createRes.body.id;
    expect(createRes.body.userId).toBe(1);

    // 2) add product
    const addRes = await request(app.getHttpServer())
      .post('/cart-products')
      .send({ cartId, productId: 1, amount: 3 })
      .expect(201);

    expect(addRes.body).toBeDefined();
    expect(addRes.body.cartId).toBe(cartId);
    expect(addRes.body.productId).toBe(1);

    // 3) list products
    const listRes = await request(app.getHttpServer()).get(`/cart-products/cart/${cartId}`).expect(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.find((p: any) => p.productId === 1)).toBeDefined();

    // 4) delete product
    const delProductRes = await request(app.getHttpServer()).delete(`/cart-products/cart/${cartId}/product/1`).expect(200);
    expect(delProductRes.body).toBeDefined();
    expect(delProductRes.body.productId).toBe(1);

    // 5) delete cart
    await request(app.getHttpServer()).delete(`/carts/${cartId}`).expect(200);

    // confirm deleted
    await request(app.getHttpServer()).get(`/carts/${cartId}`).expect(404);
  });
});
