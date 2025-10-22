import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CartProductRepositoryPort } from '../../core/cart-products/domain/cart-product.repository.port';
import { CartProduct } from '../../core/cart-products/domain/cart-product.entity';

@Injectable()
export class PrismaCartProductRepository implements CartProductRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(cartProduct: CartProduct): Promise<CartProduct> {
    const created = await this.prisma.cartProduct.create({
      data: {
        cartId: cartProduct.cartId,
        productId: cartProduct.productId,
        amount: cartProduct.amount,
      },
    });
    return new CartProduct(created.id, created.cartId, created.productId, created.amount);
  }

  async listByCart(cartId: number): Promise<CartProduct[]> {
    const cartProducts = await this.prisma.cartProduct.findMany({
      where: { cartId },
    });
    return cartProducts.map(
      c => new CartProduct(c.id, c.cartId, c.productId, c.amount),
    );
  }

  async deleteByCartAndProduct(cartId: number, productId: number): Promise<CartProduct | null> {
    const found = await this.prisma.cartProduct.findFirst({ where: { cartId, productId } });
    if (!found) return null;
    const deleted = await this.prisma.cartProduct.delete({ where: { id: found.id } });
    return new CartProduct(deleted.id, deleted.cartId, deleted.productId, deleted.amount);
  }
}
