import { Inject, Injectable } from '@nestjs/common';
import { CART_REPOSITORY } from '../tokens';
import type { CartRepositoryPort } from '../../domain/cart.repository.port';
import { Cart } from '../../domain/cart.entity';

@Injectable()
export class CreateCartUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepositoryPort,
  ) {}

  async execute(userId: number): Promise<Cart> {
    const cart = new Cart(null, userId, new Date(), 'open');
    return await this.cartRepository.create(cart);
  }
}
