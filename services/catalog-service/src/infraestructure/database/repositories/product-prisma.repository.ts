import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductRepository } from '../../../domain/repositories/products.repository';
import { Product } from '../../../domain/entities/product.entity';

@Injectable()
export class ProductPrismaRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(productData: Omit<Product, 'id_product' | 'created_at'>): Promise<Product> {
    const prismaProduct = await this.prisma.product.create({
      data: {
        name: (productData as any).name,
        description: (productData as any).description ?? null,
        price: (productData as any).price,
        stock: (productData as any).stock,
        category: (productData as any).category,
      },
    });

    return this.toDomain(prismaProduct);
  }

  async findAll(): Promise<Product[]> {
    const prismaProducts = await this.prisma.product.findMany({
      where: { is_active: true },
      orderBy: { created_at: 'desc' },
    });

    return prismaProducts.map(this.toDomain);
  }

  async findById(id: number): Promise<Product | null> {
    const prismaProduct = await this.prisma.product.findUnique({
      where: { id_product: id },
    });

    return prismaProduct ? this.toDomain(prismaProduct) : null;
  }

  async update(id: number, productData: Partial<Product>): Promise<Product> {
    const prismaProduct = await this.prisma.product.update({
      where: { id_product: id },
      data: productData,
    });

    return this.toDomain(prismaProduct);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.product.update({
      where: { id_product: id },
      data: { is_active: false },
    });
  }

  async findByCategory(category: string): Promise<Product[]> {
    const prismaProducts = await this.prisma.product.findMany({
      where: { 
        category: { equals: category, mode: 'insensitive' },
        is_active: true 
      },
    });

    return prismaProducts.map(this.toDomain);
  }

  private toDomain(prismaProduct: any): Product {
    return new Product(
      prismaProduct.id_product,
      prismaProduct.name,
      prismaProduct.description,
      prismaProduct.price,
      prismaProduct.stock,
      prismaProduct.category,
      prismaProduct.is_active,
      prismaProduct.created_at
    );
  }
}