import { Inject, Injectable } from '@nestjs/common';
import { CART_REPOSITORY } from '../tokens';
import type { CartRepositoryPort } from '../../domain/cart.repository.port';
import { Cart } from '../../domain/cart.entity';

@Injectable()
export class ListCartsUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepositoryPort,
  ) {}

  async execute(userId: number): Promise<Cart[]> {
    return await this.cartRepository.listByUser(userId);
  }
}

@Injectable()
export class ListAllCartsUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepositoryPort,
  ) {}

  async execute(): Promise<Cart[]> {
    return await this.cartRepository.listAll();
  }
}
