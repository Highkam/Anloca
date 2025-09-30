import { Cart } from './cart.entity.js';

export interface CartRepositoryPort {
  create(cart: Cart): Promise<Cart>;
  findById(idCart: number): Promise<Cart | null>;
  listByUser(userId: number): Promise<Cart[]>;
  delete(idCart: number): Promise<void>;
}