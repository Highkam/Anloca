import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/infraestructure/database/prisma/prisma.service';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await prisma.product.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await prisma.product.deleteMany();
  });

  describe('POST /products', () => {
    it('should create a product successfully', async () => {
      // Arrange
      const createProductDto = {
        name: 'E2E Test Product',
        description: 'Product created in E2E test',
        price: 299.99,
        stock: 20,
        category: 'e2e-test',
      };

      // Act
      const response = await request(app.getHttpServer())
        .post('/products')
        .send(createProductDto)
        .expect(201);

      // Assert
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(createProductDto.name);
      expect(response.body.data.price).toBe(createProductDto.price);
      expect(response.body.data.is_active).toBe(true);

      // Verify in database
      const dbProduct = await prisma.product.findFirst({
        where: { name: createProductDto.name },
      });
      expect(dbProduct).toBeDefined();
      expect(dbProduct?.price).toBe(createProductDto.price);
    });

    it('should return 400 for invalid product data', async () => {
      // Arrange
      const invalidProductDto = {
        name: '', // Empty name
        price: -100, // Negative price
        stock: -5, // Negative stock
        category: 'test',
      };

      // Act & Assert
      await request(app.getHttpServer())
        .post('/products')
        .send(invalidProductDto)
        .expect(400);
    });
  });

  describe('GET /products', () => {
    it('should return all active products', async () => {
      // Arrange
      await prisma.product.createMany({
        data: [
          {
            name: 'Product 1',
            description: 'Description 1',
            price: 100.0,
            stock: 5,
            category: 'test',
            is_active: true,
          },
          {
            name: 'Product 2',
            description: 'Description 2',
            price: 200.0,
            stock: 3,
            category: 'test',
            is_active: true,
          },
          {
            name: 'Inactive Product',
            description: 'Should not appear',
            price: 300.0,
            stock: 1,
            category: 'test',
            is_active: false,
          },
        ],
      });

      // Act
      const response = await request(app.getHttpServer())
        .get('/products')
        .expect(200);

      // Assert
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data.every((p: any) => p.is_active)).toBe(true);
    });
  });

  describe('GET /products/:id', () => {
    it('should return product by id', async () => {
      // Arrange
      const createdProduct = await prisma.product.create({
        data: {
          name: 'Specific Product',
          description: 'For GET by ID test',
          price: 150.0,
          stock: 8,
          category: 'test',
          is_active: true,
        },
      });

      // Act
      const response = await request(app.getHttpServer())
        .get(`/products/${createdProduct.id_product}`)
        .expect(200);

      // Assert
      expect(response.body.success).toBe(true);
      expect(response.body.data.id_product).toBe(createdProduct.id_product);
      expect(response.body.data.name).toBe('Specific Product');
    });

    it('should return 404 for non-existent product', async () => {
      // Act & Assert
      await request(app.getHttpServer())
        .get('/products/99999')
        .expect(404);
    });
  });

  describe('PATCH /products/:id', () => {
    it('should update product successfully', async () => {
      // Arrange
      const createdProduct = await prisma.product.create({
        data: {
          name: 'Original Product',
          description: 'Original description',
          price: 100.0,
          stock: 10,
          category: 'test',
          is_active: true,
        },
      });

      const updateData = {
        name: 'Updated Product',
        price: 120.0,
      };

      // Act
      const response = await request(app.getHttpServer())
        .patch(`/products/${createdProduct.id_product}`)
        .send(updateData)
        .expect(200);

      // Assert
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Updated Product');
      expect(response.body.data.price).toBe(120.0);

      // Verify in database
      const dbProduct = await prisma.product.findUnique({
        where: { id_product: createdProduct.id_product },
      });
      expect(dbProduct?.name).toBe('Updated Product');
    });
  });

  describe('DELETE /products/:id', () => {
    it('should soft delete product', async () => {
      // Arrange
      const createdProduct = await prisma.product.create({
        data: {
          name: 'Product to Delete',
          description: 'Will be soft deleted',
          price: 75.0,
          stock: 3,
          category: 'test',
          is_active: true,
        },
      });

      // Act
      await request(app.getHttpServer())
        .delete(`/products/${createdProduct.id_product}`)
        .expect(200);

      // Assert
      const dbProduct = await prisma.product.findUnique({
        where: { id_product: createdProduct.id_product },
      });
      expect(dbProduct?.is_active).toBe(false);
    });
  });
});