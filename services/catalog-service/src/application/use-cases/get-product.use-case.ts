import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import type{ ProductRepository } from '../../domain/repositories/products.repository';

@Injectable()
export class GetProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: number): Promise<Product> {
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return product;
  }
}