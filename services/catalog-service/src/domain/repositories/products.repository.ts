import { Product } from '../entities/product.entity';

export interface ProductRepository {
  create(product: Omit<Product, 'id_product' | 'created_at'>): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  update(id: number, product: Partial<Product>): Promise<Product>;
  delete(id: number): Promise<void>;
  findByCategory(category: string): Promise<Product[]>;
}
