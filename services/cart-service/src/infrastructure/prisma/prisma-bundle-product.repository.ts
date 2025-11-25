import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BundleProduct } from '../../core/bundle-products/domain/bundle-product.entity';
import type { BundleProductRepositoryPort } from '../../core/bundle-products/domain/bundle-product.repository.port';

@Injectable()
export class PrismaBundleProductRepository implements BundleProductRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { bundleId: number; productId: number; amount: number }): Promise<BundleProduct> {
    const p = await this.prisma.bundleProduct.create({
      data: {
        bundleId: data.bundleId,
        productId: data.productId,
        amount: data.amount,
      },
    });
    return new BundleProduct(p.id, p.bundleId, p.productId, p.amount);
  }

  async update(id: number, data: { productId?: number; amount?: number }): Promise<BundleProduct> {
    const p = await this.prisma.bundleProduct.update({
      where: { id },
      data: {
        ...(data.productId !== undefined ? { productId: data.productId } : {}),
        ...(data.amount !== undefined ? { amount: data.amount } : {}),
      },
    });
    return new BundleProduct(p.id, p.bundleId, p.productId, p.amount);
  }

  async findById(id: number): Promise<BundleProduct | null> {
    const p = await this.prisma.bundleProduct.findUnique({ where: { id } });
    return p ? new BundleProduct(p.id, p.bundleId, p.productId, p.amount) : null;
  }

  async findAll(): Promise<BundleProduct[]> {
    const list = await this.prisma.bundleProduct.findMany();
    return list.map(p => new BundleProduct(p.id, p.bundleId, p.productId, p.amount));
  }

  async delete(id: number): Promise<void> {
    await this.prisma.bundleProduct.delete({ where: { id } });
  }
}