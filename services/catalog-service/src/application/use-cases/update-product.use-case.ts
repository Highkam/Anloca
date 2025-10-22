import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import type { ProductRepository } from '../../domain/repositories/products.repository';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      if (updateProductDto.price && updateProductDto.price <= 0) {
        throw new BadRequestException('Price must be positive');
      }

      if (updateProductDto.stock && updateProductDto.stock < 0) {
        throw new BadRequestException('Stock cannot be negative');
      }

      return await this.productRepository.update(id, updateProductDto);
    } catch (error) {
      throw new BadRequestException(`Error updating product: ${error.message}`);
    }
  }
}