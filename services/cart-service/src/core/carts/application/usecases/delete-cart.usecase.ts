import { Inject, Injectable } from '@nestjs/common';
import { CART_REPOSITORY } from '../tokens';
import type { CartRepositoryPort } from '../../domain/cart.repository.port';

@Injectable()
export class DeleteCartUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepositoryPort,
  ) {}

  async execute(idCart: number): Promise<void> {
    await this.cartRepository.delete(idCart);
  }
}
