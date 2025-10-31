import { Inject, Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { CART_REPOSITORY } from '../../../carts/application/tokens';
import { CART_PRODUCT_REPOSITORY } from '../tokens';
import type { CartProductRepositoryPort } from '../../domain/cart-product.repository.port';
import type { CartRepositoryPort } from '../../../carts/domain/cart.repository.port';
import { CartProduct } from '../../domain/cart-product.entity';
import { CatalogClientService } from '../../../../infrastructure/catalog.client';

@Injectable()
export class CreateCartProductUseCase {
  private readonly logger = new Logger(CreateCartProductUseCase.name);

  constructor(
    @Inject(CART_PRODUCT_REPOSITORY)
    private readonly cartProductRepository: CartProductRepositoryPort,
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepositoryPort,
    private readonly catalogClient: CatalogClientService,
  ) {}

  // ✅ ELIMINADO: sessionToken y authClient - ya no son necesarios
  async execute(cartId: number, productId: number, amount: number): Promise<CartProduct> {
    this.logger.debug(`Executing CreateCartProductUseCase: cartId=${cartId}, productId=${productId}, amount=${amount}`);
    
    const cart = await this.cartRepository.findById(cartId);
    if (!cart) throw new NotFoundException(`Cart with id ${cartId} not found`);

    // verify product exists
    this.logger.debug(`Fetching product ${productId} from catalog`);
    const product = await this.catalogClient.getProduct(productId);
    this.logger.debug(`Product fetch result: ${JSON.stringify(product)}`);
    
    if (!product) throw new NotFoundException(`Product with id ${productId} not found`);

    const cartProduct = new CartProduct(null, cartId, productId, amount);
    return await this.cartProductRepository.create(cartProduct);
  }
}