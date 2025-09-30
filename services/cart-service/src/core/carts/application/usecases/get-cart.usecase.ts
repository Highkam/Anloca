import { Inject, Injectable } from '@nestjs/common';
import { CART_REPOSITORY } from '../tokens';
import type { CartRepositoryPort } from '../../domain/cart.repository.port';
import { Cart } from '../../domain/cart.entity';

@Injectable()
export class GetCartUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepositoryPort,
  ) {}

  async execute(idCart: number): Promise<Cart | null> {
    return await this.cartRepository.findById(idCart);
  }
}
