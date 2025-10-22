import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CART_PRODUCT_REPOSITORY } from '../tokens';
import type { CartProductRepositoryPort } from '../../domain/cart-product.repository.port';
import { CartProduct } from '../../domain/cart-product.entity';

@Injectable()
export class DeleteCartProductUseCase {
  constructor(
    @Inject(CART_PRODUCT_REPOSITORY)
    private readonly cartProductRepository: CartProductRepositoryPort,
  ) {}

  async execute(cartId: number, productId: number): Promise<CartProduct> {
    const deleted = await this.cartProductRepository.deleteByCartAndProduct(cartId, productId);
    if (!deleted) throw new NotFoundException(`CartProduct not found for cartId=${cartId} and productId=${productId}`);
    return deleted;
  }
}
