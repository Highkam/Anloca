import { CartProduct } from '../../domain/cart-product.entity';
import { CartProductDto } from '../dto/cart-product.dto';

export class CartProductMapper {
  static toDto(cartProduct: CartProduct): CartProductDto {
    return {
      id: cartProduct.id!,
      cartId: cartProduct.cartId,
      productId: cartProduct.productId,
      amount: cartProduct.amount,
    };
  }
}