import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BUNDLE_PRODUCT_REPOSITORY } from '../tokens';
import type { BundleProductRepositoryPort } from '../../../bundle-products/domain/bundle-product.repository.port';

@Injectable()
export class UpdateBundleProductUseCase {
  constructor(@Inject(BUNDLE_PRODUCT_REPOSITORY) private readonly repo: BundleProductRepositoryPort) {}

  async execute(id: number, data: { productId?: number; amount?: number }) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new NotFoundException('BundleProduct not found');
    return this.repo.update(id, data);
  }
}