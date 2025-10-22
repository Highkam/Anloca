import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../src/infraestructure/database/prisma/prisma.service';
import { ProductPrismaRepository } from '../../../src/infraestructure/database/repositories/product-prisma.repository';
import { TestDatabaseSetup } from '../setup/test-database.setup';
import { Product } from '../../../src/domain/entities/product.entity';

describe('ProductPrismaRepository Integration', () => {
  let repository: ProductPrismaRepository;
  let prisma: PrismaService;
  let testSetup: TestDatabaseSetup;

  beforeAll(async () => {
    testSetup = new TestDatabaseSetup();
    prisma = await testSetup.setup();
    repository = new ProductPrismaRepository(prisma);
  });

  afterAll(async () => {
    await testSetup.teardown();
  });

  beforeEach(async () => {
    await prisma.product.deleteMany();
  });

  describe('create', () => {
    it('should create a product in the database', async () => {
      // Arrange
      const productData = {
        name: 'Integration Test Product',
        description: 'Product created in integration test',
        price: 99.99,
        stock: 10,
        category: 'integration-test',
        is_active: true,
      } as unknown as Omit<Product, 'id_product' | 'created_at'>;

      // Act
      const result = await repository.create(productData);

      // Assert
      expect(result).toBeInstanceOf(Product);
      expect(result.name).toBe(productData.name);
      expect(result.price).toBe(productData.price);
      expect(result.is_active).toBe(true);

      // Verify in database directly
      const dbProduct = await prisma.product.findUnique({
        where: { id_product: result.id_product },
      });
      expect(dbProduct).toBeDefined();
      expect(dbProduct?.name).toBe(productData.name);
    });
  });

  describe('findAll', () => {
    it('should return all active products from database', async () => {
      // Arrange
      await prisma.product.createMany({
        data: [
          {
            name: 'Product 1',
            description: 'Description 1',
            price: 10.0,
            stock: 5,
            category: 'test',
            is_active: true,
          },
          {
            name: 'Product 2',
            description: 'Description 2',
            price: 20.0,
            stock: 3,
            category: 'test',
            is_active: true,
          },
          {
            name: 'Inactive Product',
            description: 'Should not appear',
            price: 30.0,
            stock: 1,
            category: 'test',
            is_active: false,
          },
        ],
      });

      // Act
      const result = await repository.findAll();

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Product);
      expect(result[1]).toBeInstanceOf(Product);
      expect(result.every(p => p.is_active)).toBe(true);
    });
  });

  describe('findById', () => {
    it('should return product by id from database', async () => {
      // Arrange
      const createdProduct = await prisma.product.create({
        data: {
          name: 'Find By ID Test',
          description: 'Test description',
          price: 50.0,
          stock: 8,
          category: 'test',
          is_active: true,
        },
      });

      // Act
      const result = await repository.findById(createdProduct.id_product);

      // Assert
      expect(result).toBeInstanceOf(Product);
      expect(result?.id_product).toBe(createdProduct.id_product);
      expect(result?.name).toBe('Find By ID Test');
    });

    it('should return null for non-existent id', async () => {
      // Act
      const result = await repository.findById(99999);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update product in database', async () => {
      // Arrange
      const createdProduct = await prisma.product.create({
        data: {
          name: 'Original Name',
          description: 'Original Description',
          price: 100.0,
          stock: 5,
          category: 'test',
          is_active: true,
        },
      });

      // Act
      const result = await repository.update(createdProduct.id_product, {
        name: 'Updated Name',
        price: 150.0,
      });

      // Assert
      expect(result).toBeInstanceOf(Product);
      expect(result.name).toBe('Updated Name');
      expect(result.price).toBe(150.0);
      expect(result.description).toBe('Original Description'); // Should remain unchanged

      // Verify in database
      const dbProduct = await prisma.product.findUnique({
        where: { id_product: createdProduct.id_product },
      });
      expect(dbProduct?.name).toBe('Updated Name');
      expect(dbProduct?.price).toBe(150.0);
    });
  });

  describe('delete', () => {
    it('should soft delete product in database', async () => {
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
      await repository.delete(createdProduct.id_product);

      // Assert
      const dbProduct = await prisma.product.findUnique({
        where: { id_product: createdProduct.id_product },
      });
      expect(dbProduct?.is_active).toBe(false);
    });
  });

  describe('findByCategory', () => {
    it('should return products by category from database', async () => {
      // Arrange
      await prisma.product.createMany({
        data: [
          {
            name: 'Electronics Product 1',
            description: 'Description',
            price: 100.0,
            stock: 5,
            category: 'electronics',
            is_active: true,
          },
          {
            name: 'Electronics Product 2',
            description: 'Description',
            price: 200.0,
            stock: 3,
            category: 'electronics',
            is_active: true,
          },
          {
            name: 'Books Product',
            description: 'Description',
            price: 30.0,
            stock: 10,
            category: 'books',
            is_active: true,
          },
        ],
      });

      // Act
      const result = await repository.findByCategory('electronics');

      // Assert
      expect(result).toHaveLength(2);
      expect(result.every(p => p.category === 'electronics')).toBe(true);
      expect(result.every(p => p.is_active)).toBe(true);
    });
  });
});