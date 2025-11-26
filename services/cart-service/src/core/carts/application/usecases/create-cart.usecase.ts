import { Inject, Injectable, ConflictException } from '@nestjs/common';
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
    // Validar que el usuario no tenga un carrito existente
    const existingCarts = await this.cartRepository.listByUser(userId);
    if (existingCarts && existingCarts.length > 0) {
      throw new ConflictException(`El usuario ${userId} ya tiene un carrito existente`);
    }

    const cart = new Cart(null, userId, new Date(), 'open');
    return await this.cartRepository.create(cart);
  }
}
