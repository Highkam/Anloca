import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CART_REPOSITORY } from '../../../carts/application/tokens';
import { CART_PRODUCT_REPOSITORY } from '../tokens';
import type { CartProductRepositoryPort } from '../../domain/cart-product.repository.port';
import type { CartRepositoryPort } from '../../../carts/domain/cart.repository.port';
import { CartProduct } from '../../domain/cart-product.entity';

@Injectable()
export class CreateCartProductUseCase {
  constructor(
    @Inject(CART_PRODUCT_REPOSITORY)
    private readonly cartProductRepository: CartProductRepositoryPort,
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepositoryPort,
  ) {}

  async execute(cartId: number, productId: number, amount: number): Promise<CartProduct> {
    const cart = await this.cartRepository.findById(cartId);
    if (!cart) throw new NotFoundException(`Cart with id ${cartId} not found`);

    const cartProduct = new CartProduct(null, cartId, productId, amount);
    return await this.cartProductRepository.create(cartProduct);
  }
}
