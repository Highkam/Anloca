import request from 'supertest';

// Base URLs for each microservice (adjust if running on different ports/hosts)
const AUTH_URL = 'http://localhost:3001';
const CATALOG_URL = 'http://localhost:3000';
const CART_URL = 'http://localhost:3002';

describe('End-to-End Integration: Auth, Catalog, Cart', () => {
  let sessionToken: string;
  let userId: number;
  let productId: number;
  let cartId: number;

  // Sample user and product data (using existing user)
  const userPayload = {
    name: 'ange',
    email: 'ange@gmail.com',
    password: 'ange123',
  };

  const productPayload = {
    name: 'Integration Widget',
    description: 'Widget for integration testing',
    price: 99.99,
    stock: 10,
    category: 'testing',
  };

  beforeAll(async () => {
    // Using seeded user from auth service, no registration needed
    console.log('Using seeded user:', userPayload.email);
  });

  afterAll(async () => {
    // Cleanup: Remove test cart, user, etc. if endpoints exist
    // Optionally, delete created cart and user via admin endpoints
  });

  describe('Auth Service', () => {
    it('should login and return session token', async () => {
      // Login and get session token
      const res = await request(AUTH_URL)
        .post('/api/auth/login')
        .send({ email: userPayload.email, password: userPayload.password })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('sessionToken');
      sessionToken = res.body.sessionToken;
      userId = res.body.id;
    });

    it('should validate session token', async () => {
      // Validate token
      const res = await request(AUTH_URL)
        .get('/api/auth/session')
        .set('x-session-token', sessionToken)
        .expect(200);

      expect(res.body.valid).toBe(true);
      expect(res.body.id).toBe(userId);
    });

    it('should reject invalid token', async () => {
      const res = await request(AUTH_URL)
        .get('/api/auth/session')
        .set('x-session-token', 'invalid-token')
        .expect(200);

      expect(res.body.valid).toBe(false);
      expect(res.body.id).toBeNull();
    });
  });

  describe('Catalog Service', () => {
    it('should create a product', async () => {
      // Create product (assume admin access or open endpoint)
      const res = await request(CATALOG_URL)
        .post('/api/products')
        .send(productPayload)
        .expect(201);

      expect(res.body).toHaveProperty('id_product');
      expect(res.body.name).toBe(productPayload.name);
      productId = res.body.id_product;
    });

    it('should retrieve product by id', async () => {
      const res = await request(CATALOG_URL)
        .get(`/api/products/${productId}`)
        .expect(200);

      expect(res.body).toHaveProperty('id_product', productId);
      expect(res.body.name).toBe(productPayload.name);
    });

    it('should return 404 for missing product', async () => {
      await request(CATALOG_URL)
        .get('/api/products/999999')
        .expect(404);
    });
  });

  describe('Cart Service', () => {
    it('should create a cart for the user', async () => {
      const res = await request(CART_URL)
        .post('/api/carts')
        .set('x-session-token', sessionToken)
        .send({ userId })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.userId).toBe(userId);
      cartId = res.body.id;
    });

    it('should add product to cart', async () => {
      const res = await request(CART_URL)
        .post('/api/cart-products')
        .set('x-session-token', sessionToken)
        .send({ cartId, productId, amount: 2 })
        .expect(201);

      expect(res.body.cartId).toBe(cartId);
      expect(res.body.productId).toBe(productId);
      expect(res.body.amount).toBe(2);
    });

    it('should list products in cart', async () => {
      const res = await request(CART_URL)
        .get(`/api/cart-products/cart/${cartId}`)
        .set('x-session-token', sessionToken)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
      expect(res.body[0].productId).toBe(productId);
    });

    it('should remove product from cart', async () => {
      const res = await request(CART_URL)
        .delete(`/api/cart-products/cart/${cartId}/product/${productId}`)
        .set('x-session-token', sessionToken)
        .expect(200);

      expect(res.body.productId).toBe(productId);
    });

    it('should fail to add missing product', async () => {
      await request(CART_URL)
        .post('/api/cart-products')
        .set('x-session-token', sessionToken)
        .send({ cartId, productId: 999999, amount: 1 })
        .expect(404);
    });

    it('should fail to create cart with invalid token', async () => {
      await request(CART_URL)
        .post('/api/carts')
        .set('x-session-token', 'invalid-token')
        .send({ userId })
        .expect(401);
    });

    // Optionally: test checkout flow if endpoint exists
    // it('should checkout cart', async () => {
    //   const res = await request(CART_URL)
    //     .post(`/carts/${cartId}/checkout`)
    //     .set('x-session-token', sessionToken)
    //     .expect(200);
    //   expect(res.body).toHaveProperty('success', true);
    // });

    // it('should fail checkout with empty cart', async () => {
    //   const res = await request(CART_URL)
    //     .post(`/carts/${cartId}/checkout`)
    //     .set('x-session-token', sessionToken)
    //     .expect(400);
    // });
  });
});