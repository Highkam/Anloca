import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import type { ProductRepository } from '../../domain/repositories/products.repository';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(createProductDto: CreateProductDto): Promise<Product> {
    try {
      if (createProductDto.price <= 0) {
        throw new BadRequestException('Price must be positive');
      }

      if (createProductDto.stock < 0) {
        throw new BadRequestException('Stock cannot be negative');
      }

      const productToCreate = new Product(
        0,
        createProductDto.name,
        createProductDto.description || null,
        createProductDto.price,
        createProductDto.stock,
        createProductDto.category,
        true,
        new Date()
      );

      return await this.productRepository.create(productToCreate);
    } catch (error) {
      throw new BadRequestException(`Error creating product: ${error.message}`);
    }
  }
}