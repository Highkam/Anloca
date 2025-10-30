import { Test, TestingModule } from '@nestjs/testing';
import { DeleteProductUseCase } from '../../../../src/application/use-cases/delete-product.use-case';
import { ProductRepository } from '../../../../src/domain/repositories/products.repository';

describe('DeleteProductUseCase', () => {
  let useCase: DeleteProductUseCase;
  let productRepository: ProductRepository;

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
        DeleteProductUseCase,
        {
          provide: 'ProductRepository',
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    useCase = module.get<DeleteProductUseCase>(DeleteProductUseCase);
    productRepository = module.get('ProductRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should delete product successfully', async () => {
      // Arrange
      mockProductRepository.delete.mockResolvedValue(undefined);

      // Act
      await useCase.execute(1);

      // Assert
      expect(mockProductRepository.delete).toHaveBeenCalledWith(1);
      expect(mockProductRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should handle repository errors', async () => {
      // Arrange
      mockProductRepository.delete.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(useCase.execute(1)).rejects.toThrow('Database error');
    });
  });
});