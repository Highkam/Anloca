import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BUNDLE_PRODUCT_REPOSITORY } from '../tokens';
import type { BundleProductRepositoryPort } from '../../../bundle-products/domain/bundle-product.repository.port';

@Injectable()
export class GetBundleProductUseCase {
  constructor(@Inject(BUNDLE_PRODUCT_REPOSITORY) private readonly repo: BundleProductRepositoryPort) {}

  async execute(id: number) {
    const p = await this.repo.findById(id);
    if (!p) throw new NotFoundException('BundleProduct not found');
    return p;
  }
}