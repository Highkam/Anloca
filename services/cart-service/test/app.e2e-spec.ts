import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ExecutionContext } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { SessionRequiredGuard } from './../src/common/guards/session-required.guard';
import { PrismaService } from './../src/infrastructure/prisma.service';

describe('Cart Service Integration (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const mockGuard = {
    canActivate: (context: ExecutionContext) => {
      const req = context.switchToHttp().getRequest();
      // simulate a validated session user id = 1
      req.userId = 1;
      return true;
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SessionRequiredGuard)
      .useValue(mockGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);

    // Clean tables before running (assumes DATABASE_URL is set to a test DB)
    await prisma.cartProduct.deleteMany();
    await prisma.cart.deleteMany();
  });

  afterAll(async () => {
    // Clean up and close
    if (prisma) {
      await prisma.cartProduct.deleteMany();
      await prisma.cart.deleteMany();
      await prisma.$disconnect();
    }
    if (app) await app.close();
  });

  it('POST /carts -> create cart for userId 1', async () => {
    const res = await request(app.getHttpServer())
      .post('/carts')
      .send({ userId: 1 })
      .expect(201);

    expect(res.body).toBeDefined();
    expect(res.body.userId).toBe(1);
    expect(typeof res.body.id).toBe('number');
  });

  it('POST /cart-products -> add product to cart, then GET and DELETE', async () => {
    // create a cart via prisma directly to ensure we have a cartId
    const created = await prisma.cart.create({ data: { userId: 1, state: 'open' } });
    const cartId = created.id;

    // add product (use productId 1 which exists in catalog seed)
    const addRes = await request(app.getHttpServer())
      .post('/cart-products')
      .send({ cartId, productId: 1, amount: 2 })
      .expect(201);

    expect(addRes.body).toBeDefined();
    expect(addRes.body.cartId).toBe(cartId);
    expect(addRes.body.productId).toBe(1);

    // list products
    const listRes = await request(app.getHttpServer()).get(`/cart-products/cart/${cartId}`).expect(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.length).toBeGreaterThanOrEqual(1);

    // delete product
    const delRes = await request(app.getHttpServer()).delete(`/cart-products/cart/${cartId}/product/1`).expect(200);
    expect(delRes.body).toBeDefined();
    expect(delRes.body.productId).toBe(1);
  });
});
