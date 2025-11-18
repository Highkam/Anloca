import { BundleProduct } from './bundle-product.entity';

export interface BundleProductRepositoryPort {
  create(data: { bundleId: number; productId: number; amount: number }): Promise<BundleProduct>;
  update(id: number, data: { productId?: number; amount?: number }): Promise<BundleProduct>;
  findById(id: number): Promise<BundleProduct | null>;
  findAll(): Promise<BundleProduct[]>;
  delete(id: number): Promise<void>;
}