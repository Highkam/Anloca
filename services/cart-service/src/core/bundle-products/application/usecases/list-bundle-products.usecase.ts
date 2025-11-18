import { Inject, Injectable } from '@nestjs/common';
import { BUNDLE_PRODUCT_REPOSITORY } from '../tokens';
import type { BundleProductRepositoryPort } from '../../../bundle-products/domain/bundle-product.repository.port';

@Injectable()
export class ListBundleProductsUseCase {
  constructor(@Inject(BUNDLE_PRODUCT_REPOSITORY) private readonly repo: BundleProductRepositoryPort) {}

  async execute() {
    return this.repo.findAll();
  }
}