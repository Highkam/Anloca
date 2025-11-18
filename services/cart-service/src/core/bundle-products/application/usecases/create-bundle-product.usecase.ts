import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BUNDLE_PRODUCT_REPOSITORY } from '../tokens';
import type { BundleProductRepositoryPort } from '../../../bundle-products/domain/bundle-product.repository.port';

@Injectable()
export class CreateBundleProductUseCase {
  constructor(
    @Inject(BUNDLE_PRODUCT_REPOSITORY) private readonly repo: BundleProductRepositoryPort,
  ) {}

  async execute(data: { bundleId: number; productId: number; amount: number }) {
    // If you want to validate bundle existence, inject PERIOD/BUNDLE repo here and check.
    return this.repo.create(data);
  }
}