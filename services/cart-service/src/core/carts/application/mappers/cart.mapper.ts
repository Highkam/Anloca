import { Cart } from '../../domain/cart.entity.js';
import { CartDto } from '../dto/cart.dto';

export class CartMapper {
  static toDto(cart: Cart): CartDto {
    return {
      id: cart.id!,
      userId: cart.userId,
      createdAt: cart.createdAt,
      state: cart.state,
    };
  }
}
