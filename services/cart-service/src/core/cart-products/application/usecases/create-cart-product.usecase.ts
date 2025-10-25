import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CART_REPOSITORY } from '../../../carts/application/tokens';
import { CART_PRODUCT_REPOSITORY } from '../tokens';
import type { CartProductRepositoryPort } from '../../domain/cart-product.repository.port';
import type { CartRepositoryPort } from '../../../carts/domain/cart.repository.port';
import { CartProduct } from '../../domain/cart-product.entity';
import { CatalogService } from '../../../../common/services/catalog.service';

@Injectable()
export class CreateCartProductUseCase {
  constructor(
    @Inject(CART_PRODUCT_REPOSITORY)
    private readonly cartProductRepository: CartProductRepositoryPort,
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepositoryPort,
    private readonly catalogService: CatalogService,
  ) {}

  async execute(cartId: number, productId: number, amount: number): Promise<CartProduct> {
    const cart = await this.cartRepository.findById(cartId);
    if (!cart) throw new NotFoundException(`Cart with id ${cartId} not found`);

    // verify product exists in catalog
    const exists = await this.catalogService.productExists(productId);
    if (!exists) throw new BadRequestException(`Product with id ${productId} does not exist in catalog`);

    const cartProduct = new CartProduct(null, cartId, productId, amount);
    return await this.cartProductRepository.create(cartProduct);
  }
}
