import { Price } from '../../../../src/domain/value-objects/price.value-object';

describe('Price Value Object', () => {
  describe('Constructor', () => {
    it('should create price with valid value', () => {
      // Act
      const price = new Price(100.50);

      // Assert
      expect(price.getValue()).toBe(100.50);
    });

    it('should throw error for negative value', () => {
      // Act & Assert
      expect(() => new Price(-10)).toThrow('Price cannot be negative');
    });
  });

  describe('Methods', () => {
    let price: Price;

    beforeEach(() => {
      price = new Price(100.50);
    });

    describe('getValue', () => {
      it('should return the numeric value', () => {
        // Act & Assert
        expect(price.getValue()).toBe(100.50);
      });
    });

    describe('format', () => {
      it('should format price as currency', () => {
        // Act & Assert
        expect(price.format()).toBe('$100.50');
      });
    });

    describe('add', () => {
      it('should add two prices', () => {
        // Arrange
        const otherPrice = new Price(50.25);

        // Act
        const result = price.add(otherPrice);

        // Assert
        expect(result.getValue()).toBe(150.75);
        expect(result).toBeInstanceOf(Price);
      });
    });

    describe('subtract', () => {
      it('should subtract two prices', () => {
        // Arrange
        const otherPrice = new Price(25.25);

        // Act
        const result = price.subtract(otherPrice);

        // Assert
        expect(result.getValue()).toBe(75.25);
        expect(result).toBeInstanceOf(Price);
      });

      it('should handle zero result', () => {
        // Arrange
        const samePrice = new Price(100.50);

        // Act
        const result = price.subtract(samePrice);

        // Assert
        expect(result.getValue()).toBe(0);
      });
    });
  });
});