import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CreateProductUseCase } from '../../../../src/application/use-cases/create-product.use-case';
import { ProductRepository } from '../../../../src/domain/repositories/products.repository';
import { Product } from '../../../../src/domain/entities/product.entity';

describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;
  let productRepository: ProductRepository;

  const mockProduct: Product = new Product(
    1,
    'Test Product',
    'Test Description',
    100.50,
    10,
    'electronics',
    true,
    new Date()
  );

  const mockProductRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findByCategory: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductUseCase,
        {
          provide: 'ProductRepository',
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateProductUseCase>(CreateProductUseCase);
    productRepository = module.get('ProductRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should create a product successfully with valid data', async () => {
      // Arrange
      const createProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100.50,
        stock: 10,
        category: 'electronics',
      };

      mockProductRepository.create.mockResolvedValue(mockProduct);

      // Act
      const result = await useCase.execute(createProductDto);

      // Assert
      expect(result).toEqual(mockProduct);
      expect(mockProductRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test Product',
          description: 'Test Description',
          price: 100.50,
          stock: 10,
          category: 'electronics',
          is_active: true,
        })
      );
    });

    it('should throw BadRequestException for negative price', async () => {
      // Arrange
      const createProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: -10, // Invalid
        stock: 10,
        category: 'electronics',
      };

      // Act & Assert
      await expect(useCase.execute(createProductDto)).rejects.toThrow(BadRequestException);
      await expect(useCase.execute(createProductDto)).rejects.toThrow('Price must be positive');
      expect(mockProductRepository.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for negative stock', async () => {
      // Arrange
      const createProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100.50,
        stock: -5, // Invalid
        category: 'electronics',
      };

      // Act & Assert
      await expect(useCase.execute(createProductDto)).rejects.toThrow(BadRequestException);
      await expect(useCase.execute(createProductDto)).rejects.toThrow('Stock cannot be negative');
      expect(mockProductRepository.create).not.toHaveBeenCalled();
    });

    it('should handle repository errors', async () => {
      // Arrange
      const createProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100.50,
        stock: 10,
        category: 'electronics',
      };

      mockProductRepository.create.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(useCase.execute(createProductDto)).rejects.toThrow(BadRequestException);
      await expect(useCase.execute(createProductDto)).rejects.toThrow('Error creating product: Database error');
    });
  });
});