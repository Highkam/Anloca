import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../src/infraestructure/database/prisma/prisma.service';
import { ProductPrismaRepository } from '../../../src/infraestructure/database/repositories/product-prisma.repository';
import { CreateProductUseCase } from '../../../src/application/use-cases/create-product.use-case';
import { TestDatabaseSetup } from '../setup/test-database.setup';

describe('CreateProductUseCase Integration', () => {
  let useCase: CreateProductUseCase;
  let prisma: PrismaService;
  let testSetup: TestDatabaseSetup;

  beforeAll(async () => {
    testSetup = new TestDatabaseSetup();
    prisma = await testSetup.setup();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductUseCase,
        {
          provide: 'ProductRepository',
          useFactory: () => new ProductPrismaRepository(prisma),
        },
      ],
    }).compile();

    useCase = module.get<CreateProductUseCase>(CreateProductUseCase);
  });

  afterAll(async () => {
    await testSetup.teardown();
  });

  beforeEach(async () => {
    await prisma.product.deleteMany();
  });

  it('should create a product successfully with valid data', async () => {
    // Arrange
    const createProductDto = {
      name: 'Integration Test Product',
      description: 'Created via use case integration test',
      price: 199.99,
      stock: 15,
      category: 'integration-test',
    };

    // Act
    const result = await useCase.execute(createProductDto);

    // Assert
    expect(result).toBeDefined();
    expect(result.id_product).toBeDefined();
    expect(result.name).toBe(createProductDto.name);
    expect(result.price).toBe(createProductDto.price);
    expect(result.is_active).toBe(true);

    // Verify in database
    const dbProduct = await prisma.product.findUnique({
      where: { id_product: result.id_product },
    });
    expect(dbProduct).toBeDefined();
    expect(dbProduct?.name).toBe(createProductDto.name);
  });

  it('should throw error when creating product with negative price', async () => {
    // Arrange
    const createProductDto = {
      name: 'Invalid Product',
      description: 'Should fail',
      price: -10, // Invalid price
      stock: 5,
      category: 'test',
    };

    // Act & Assert
    await expect(useCase.execute(createProductDto)).rejects.toThrow();
  });

  it('should throw error when creating product with negative stock', async () => {
    // Arrange
    const createProductDto = {
      name: 'Invalid Product',
      description: 'Should fail',
      price: 50.0,
      stock: -5, // Invalid stock
      category: 'test',
    };

    // Act & Assert
    await expect(useCase.execute(createProductDto)).rejects.toThrow();
  });
});