import { Inject, Injectable } from '@nestjs/common';
import { CART_PRODUCT_REPOSITORY } from '../tokens';
import type { CartProductRepositoryPort } from '../../domain/cart-product.repository.port';
import { CartProduct } from '../../domain/cart-product.entity';

@Injectable()
export class ListCartProductsUseCase {
  constructor(
    @Inject(CART_PRODUCT_REPOSITORY)
    private readonly cartProductRepository: CartProductRepositoryPort,
  ) {}

  async execute(cartId: number): Promise<CartProduct[]> {
    return await this.cartProductRepository.listByCart(cartId);
  }
}
