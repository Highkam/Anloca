import { Product } from './product.entity';

describe('Product Entity', () => {
  it('should create a product with default values', () => {
    const product = new Product();
    product.name = 'Test Product';
    product.description = 'Test Description';
    product.price = 100.50;
    product.stock = 10;
    product.category = 'electronics';

    expect(product.id).toBeUndefined();
    expect(product.name).toBe('Test Product');
    expect(product.description).toBe('Test Description');
    expect(product.price).toBe(100.50);
    expect(product.stock).toBe(10);
    expect(product.category).toBe('electronics');
    expect(product.isActive).toBeUndefined(); 
    expect(product.createdAt).toBeUndefined();
  });

  it('should create a product with custom values', () => {
    const customDate = new Date('2023-01-01');
    const product = new Product();
    product.name = 'Test Product';
    product.description = 'Test Description';
    product.price = 100.50;
    product.stock = 10;
    product.category = 'electronics';
    product.isActive = false;
    product.createdAt = customDate;

    expect(product.isActive).toBe(false);
    expect(product.createdAt).toBe(customDate);
  });
  it('should have correct entity metadata', () => {
    const product = new Product();
    
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('description');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('stock');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('isActive');
    expect(product).toHaveProperty('createdAt');
  });
});