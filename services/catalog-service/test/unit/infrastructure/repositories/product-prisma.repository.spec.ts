import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../src/infraestructure/database/prisma/prisma.service';
import { ProductPrismaRepository } from '../../../../src/infraestructure/database/repositories/product-prisma.repository';
import { Product } from '../../../../src/domain/entities/product.entity';

describe('ProductPrismaRepository', () => {
  let repository: ProductPrismaRepository;
  let prisma: PrismaService;

  const mockPrismaService = {
    product: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductPrismaRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<ProductPrismaRepository>(ProductPrismaRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a product and return domain entity', async () => {
      // Arrange
      const productData = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100.50,
        stock: 10,
        category: 'electronics',
        is_active: true,
      };

      const prismaProduct = {
        id_product: 1,
        ...productData,
        created_at: new Date('2024-01-01'),
      };

      mockPrismaService.product.create.mockResolvedValue(prismaProduct);

      // Act
    const result = await repository.create(
      productData as unknown as Omit<Product, 'id_product' | 'created_at'>
    );

      // Assert
      expect(result).toBeInstanceOf(Product);
      expect(result.id_product).toBe(1);
      expect(result.name).toBe('Test Product');
      expect(result.price).toBe(100.50);
      expect(mockPrismaService.product.create).toHaveBeenCalledWith({
        data: productData,
      });
    });
  });

  describe('findAll', () => {
    it('should return all active products as domain entities', async () => {
      // Arrange
      const prismaProducts = [
        {
          id_product: 1,
          name: 'Product 1',
          description: 'Desc 1',
          price: 100,
          stock: 10,
          category: 'electronics',
          is_active: true,
          created_at: new Date('2024-01-01'),
        },
        {
          id_product: 2,
          name: 'Product 2',
          description: 'Desc 2',
          price: 200,
          stock: 5,
          category: 'books',
          is_active: true,
          created_at: new Date('2024-01-02'),
        },
      ];

      mockPrismaService.product.findMany.mockResolvedValue(prismaProducts);

      // Act
      const result = await repository.findAll();

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Product);
      expect(result[1]).toBeInstanceOf(Product);
      expect(mockPrismaService.product.findMany).toHaveBeenCalledWith({
        where: { is_active: true },
        orderBy: { created_at: 'desc' },
      });
    });
  });

  describe('findById', () => {
    it('should return product by id as domain entity', async () => {
      // Arrange
      const prismaProduct = {
        id_product: 1,
        name: 'Test Product',
        description: 'Test Description',
        price: 100.50,
        stock: 10,
        category: 'electronics',
        is_active: true,
        created_at: new Date('2024-01-01'),
      };

      mockPrismaService.product.findUnique.mockResolvedValue(prismaProduct);

      // Act
      const result = await repository.findById(1);

      // Assert
      expect(result).toBeInstanceOf(Product);
      expect(result?.id_product).toBe(1);
      expect(mockPrismaService.product.findUnique).toHaveBeenCalledWith({
        where: { id_product: 1 },
      });
    });

    it('should return null for non-existent id', async () => {
      // Arrange
      mockPrismaService.product.findUnique.mockResolvedValue(null);

      // Act
      const result = await repository.findById(999);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update product and return domain entity', async () => {
      // Arrange
      const updateData = {
        name: 'Updated Product',
        price: 150.75,
      };

      const prismaProduct = {
        id_product: 1,
        name: 'Updated Product',
        description: 'Original Description',
        price: 150.75,
        stock: 10,
        category: 'electronics',
        is_active: true,
        created_at: new Date('2024-01-01'),
      };

      mockPrismaService.product.update.mockResolvedValue(prismaProduct);

      // Act
      const result = await repository.update(1, updateData);

      // Assert
      expect(result).toBeInstanceOf(Product);
      expect(result.name).toBe('Updated Product');
      expect(result.price).toBe(150.75);
      expect(mockPrismaService.product.update).toHaveBeenCalledWith({
        where: { id_product: 1 },
        data: updateData,
      });
    });
  });

  describe('delete', () => {
    it('should soft delete product', async () => {
      // Act
      await repository.delete(1);

      // Assert
      expect(mockPrismaService.product.update).toHaveBeenCalledWith({
        where: { id_product: 1 },
        data: { is_active: false },
      });
    });
  });

  describe('findByCategory', () => {
    it('should return products by category as domain entities', async () => {
      // Arrange
      const prismaProducts = [
        {
          id_product: 1,
          name: 'Electronics Product',
          description: 'Desc',
          price: 100,
          stock: 10,
          category: 'electronics',
          is_active: true,
          created_at: new Date('2024-01-01'),
        },
      ];

      mockPrismaService.product.findMany.mockResolvedValue(prismaProducts);

      // Act
      const result = await repository.findByCategory('electronics');

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Product);
      expect(result[0].category).toBe('electronics');
      expect(mockPrismaService.product.findMany).toHaveBeenCalledWith({
        where: { 
          category: { equals: 'electronics', mode: 'insensitive' },
          is_active: true 
        },
      });
    });
  });
});