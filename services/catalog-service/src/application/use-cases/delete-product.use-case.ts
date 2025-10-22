import { Injectable, Inject } from '@nestjs/common';
import type { ProductRepository } from '../../domain/repositories/products.repository';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}