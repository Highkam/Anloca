import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { UpdateProductUseCase } from '../../../../src/application/use-cases/update-product.use-case';
import { ProductRepository } from '../../../../src/domain/repositories/products.repository';
import { Product } from '../../../../src/domain/entities/product.entity';

describe('UpdateProductUseCase', () => {
  let useCase: UpdateProductUseCase;
  let productRepository: ProductRepository;

  const mockProduct: Product = new Product(
    1,
    'Original Product',
    'Original Description',
    100.50,
    10,
    'electronics',
    true,
    new Date()
  );

  const updatedProduct: Product = new Product(
    1,
    'Updated Product',
    'Updated Description',
    150.75,
    15,
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
        UpdateProductUseCase,
        {
          provide: 'ProductRepository',
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    useCase = module.get<UpdateProductUseCase>(UpdateProductUseCase);
    productRepository = module.get('ProductRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should update product successfully with valid data', async () => {
      // Arrange
      const updateProductDto = {
        name: 'Updated Product',
        price: 150.75,
        stock: 15,
      };

      mockProductRepository.update.mockResolvedValue(updatedProduct);

      // Act
      const result = await useCase.execute(1, updateProductDto);

      // Assert
      expect(result).toEqual(updatedProduct);
      expect(mockProductRepository.update).toHaveBeenCalledWith(1, updateProductDto);
    });

    it('should throw BadRequestException for negative price', async () => {
      // Arrange
      const updateProductDto = {
        price: -10, // Invalid
      };

      // Act & Assert
      await expect(useCase.execute(1, updateProductDto)).rejects.toThrow(BadRequestException);
      await expect(useCase.execute(1, updateProductDto)).rejects.toThrow('Price must be positive');
      expect(mockProductRepository.update).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for negative stock', async () => {
      // Arrange
      const updateProductDto = {
        stock: -5, // Invalid
      };

      // Act & Assert
      await expect(useCase.execute(1, updateProductDto)).rejects.toThrow(BadRequestException);
      await expect(useCase.execute(1, updateProductDto)).rejects.toThrow('Stock cannot be negative');
      expect(mockProductRepository.update).not.toHaveBeenCalled();
    });

    it('should handle repository errors', async () => {
      // Arrange
      const updateProductDto = {
        name: 'Updated Product',
      };

      mockProductRepository.update.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(useCase.execute(1, updateProductDto)).rejects.toThrow(BadRequestException);
      await expect(useCase.execute(1, updateProductDto)).rejects.toThrow('Error updating product: Database error');
    });
  });
});