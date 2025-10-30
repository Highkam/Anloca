import { Test, TestingModule } from '@nestjs/testing';
import { GetProductsUseCase } from '../../../../src/application/use-cases/get-products.use-case';
import { ProductRepository } from '../../../../src/domain/repositories/products.repository';
import { Product } from '../../../../src/domain/entities/product.entity';

describe('GetProductsUseCase', () => {
  let useCase: GetProductsUseCase;
  let productRepository: ProductRepository;

  const mockProducts: Product[] = [
    new Product(1, 'Product 1', 'Desc 1', 100, 10, 'electronics', true, new Date()),
    new Product(2, 'Product 2', 'Desc 2', 200, 5, 'books', true, new Date()),
  ];

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
        GetProductsUseCase,
        {
          provide: 'ProductRepository',
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetProductsUseCase>(GetProductsUseCase);
    productRepository = module.get('ProductRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should return all products', async () => {
      // Arrange
      mockProductRepository.findAll.mockResolvedValue(mockProducts);

      // Act
      const result = await useCase.execute();

      // Assert
      expect(result).toEqual(mockProducts);
      expect(mockProductRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no products exist', async () => {
      // Arrange
      mockProductRepository.findAll.mockResolvedValue([]);

      // Act
      const result = await useCase.execute();

      // Assert
      expect(result).toEqual([]);
      expect(mockProductRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });
});