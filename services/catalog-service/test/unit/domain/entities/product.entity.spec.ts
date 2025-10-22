import { Product } from '../../../../src/domain/entities/product.entity';

describe('Product Entity', () => {
  describe('Constructor', () => {
    it('should create a product with all properties', () => {
      // Arrange
      const productData = {
        id_product: 1,
        name: 'Test Product',
        description: 'Test Description',
        price: 100.50,
        stock: 10,
        category: 'electronics',
        is_active: true,
        created_at: new Date('2024-01-01'),
      };

      // Act
      const product = new Product(
        productData.id_product,
        productData.name,
        productData.description,
        productData.price,
        productData.stock,
        productData.category,
        productData.is_active,
        productData.created_at
      );

      // Assert
      expect(product.id_product).toBe(1);
      expect(product.name).toBe('Test Product');
      expect(product.description).toBe('Test Description');
      expect(product.price).toBe(100.50);
      expect(product.stock).toBe(10);
      expect(product.category).toBe('electronics');
      expect(product.is_active).toBe(true);
      expect(product.created_at).toEqual(new Date('2024-01-01'));
    });

    it('should create a product with null description', () => {
      // Act
      const product = new Product(
        1,
        'Test Product',
        null,
        100.50,
        10,
        'electronics',
        true,
        new Date()
      );

      // Assert
      expect(product.description).toBeNull();
    });
  });

  describe('Business Methods', () => {
    let product: Product;

    beforeEach(() => {
      product = new Product(
        1,
        'Test Product',
        'Test Description',
        100.50,
        10,
        'electronics',
        true,
        new Date()
      );
    });

    describe('updateStock', () => {
      it('should update stock with valid value', () => {
        // Act
        product.updateStock(15);

        // Assert
        expect(product.stock).toBe(15);
      });

      it('should throw error for negative stock', () => {
        // Act & Assert
        expect(() => product.updateStock(-5)).toThrow('Stock cannot be negative');
      });
    });

    describe('updatePrice', () => {
      it('should update price with valid value', () => {
        // Act
        product.updatePrice(150.75);

        // Assert
        expect(product.price).toBe(150.75);
      });

      it('should throw error for zero price', () => {
        // Act & Assert
        expect(() => product.updatePrice(0)).toThrow('Price must be positive');
      });

      it('should throw error for negative price', () => {
        // Act & Assert
        expect(() => product.updatePrice(-10)).toThrow('Price must be positive');
      });
    });

    describe('isAvailable', () => {
      it('should return true when product is active and has stock', () => {
        // Act & Assert
        expect(product.isAvailable()).toBe(true);
      });

      it('should return false when product is inactive', () => {
        // Arrange
        product = new Product(1, 'Test', 'Desc', 100, 10, 'test', false, new Date());

        // Act & Assert
        expect(product.isAvailable()).toBe(false);
      });

      it('should return false when product has no stock', () => {
        // Arrange
        product.updateStock(0);

        // Act & Assert
        expect(product.isAvailable()).toBe(false);
      });
    });

    describe('decreaseStock', () => {
      it('should decrease stock by given quantity', () => {
        // Act
        product.decreaseStock(3);

        // Assert
        expect(product.stock).toBe(7);
      });

      it('should throw error for zero quantity', () => {
        // Act & Assert
        expect(() => product.decreaseStock(0)).toThrow('Quantity must be positive');
      });

      it('should throw error for negative quantity', () => {
        // Act & Assert
        expect(() => product.decreaseStock(-2)).toThrow('Quantity must be positive');
      });

      it('should throw error for insufficient stock', () => {
        // Act & Assert
        expect(() => product.decreaseStock(15)).toThrow('Insufficient stock');
      });
    });
  });
});