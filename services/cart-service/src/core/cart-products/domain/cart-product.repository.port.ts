import { CartProduct } from './cart-product.entity';

export interface CartProductRepositoryPort {
  create(cartProduct: CartProduct): Promise<CartProduct>;
  listByCart(cartId: number): Promise<CartProduct[]>;
}
