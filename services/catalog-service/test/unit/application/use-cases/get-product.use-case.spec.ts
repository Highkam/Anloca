import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GetProductUseCase } from '../../../../src/application/use-cases/get-product.use-case';
import { ProductRepository } from '../../../../src/domain/repositories/products.repository';
import { Product } from '../../../../src/domain/entities/product.entity';

describe('GetProductUseCase', () => {
  let useCase: GetProductUseCase;
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
        GetProductUseCase,
        {
          provide: 'ProductRepository',
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetProductUseCase>(GetProductUseCase);
    productRepository = module.get('ProductRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should return product when found', async () => {
      // Arrange
      mockProductRepository.findById.mockResolvedValue(mockProduct);

      // Act
      const result = await useCase.execute(1);

      // Assert
      expect(result).toEqual(mockProduct);
      expect(mockProductRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when product not found', async () => {
      // Arrange
      mockProductRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(useCase.execute(999)).rejects.toThrow(NotFoundException);
      await expect(useCase.execute(999)).rejects.toThrow('Product with ID 999 not found');
      expect(mockProductRepository.findById).toHaveBeenCalledWith(999);
    });
  });
});