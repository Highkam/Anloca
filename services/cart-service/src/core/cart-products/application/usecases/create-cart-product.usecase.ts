import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CART_REPOSITORY } from '../../../carts/application/tokens';
import { CART_PRODUCT_REPOSITORY } from '../tokens';
import type { CartProductRepositoryPort } from '../../domain/cart-product.repository.port';
import type { CartRepositoryPort } from '../../../carts/domain/cart.repository.port';
import { CartProduct } from '../../domain/cart-product.entity';
import { AuthClientService } from '../../../../infrastructure/auth.client';
import { CatalogClientService } from '../../../../infrastructure/catalog.client';

@Injectable()
export class CreateCartProductUseCase {
  constructor(
    @Inject(CART_PRODUCT_REPOSITORY)
    private readonly cartProductRepository: CartProductRepositoryPort,
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepositoryPort,
    private readonly authClient: AuthClientService,
    private readonly catalogClient: CatalogClientService,
  ) {}

  async execute(cartId: number, productId: number, amount: number, sessionToken?: string): Promise<CartProduct> {
    const cart = await this.cartRepository.findById(cartId);
    if (!cart) throw new NotFoundException(`Cart with id ${cartId} not found`);

    // verify session / user
    const session = await this.authClient.getSession(sessionToken);
    if (!session || session.id === null) throw new NotFoundException('User not logged in or invalid session');

    // verify product exists
    const product = await this.catalogClient.getProduct(productId);
    if (!product) throw new NotFoundException(`Product with id ${productId} not found`);

    const cartProduct = new CartProduct(null, cartId, productId, amount);
    return await this.cartProductRepository.create(cartProduct);
  }
}
