import { Module } from '@nestjs/common';
import { PrismaCartProductRepository } from '../../../infrastructure/prisma/prisma-cart-product.repository';
import { CART_PRODUCT_REPOSITORY } from '../../../core/cart-products/application/tokens';
import { CreateCartProductUseCase } from '../../../core/cart-products/application/usecases/create-cart-product.usecase';
import { ListCartProductsUseCase } from '../../../core/cart-products/application/usecases/list-cart-products.usecase';
import { CartProductController } from './cart-product.controller';
import { CART_REPOSITORY } from '../../../core/carts/application/tokens';
import { PrismaCartRepository } from '../../../infrastructure/prisma/prisma-cart.repository';
import { PrismaModule } from '../../../infrastructure/prisma.module';
import { DeleteCartProductUseCase } from '../../../core/cart-products/application/usecases/delete-cart-product.usecase';
import { CatalogService } from '../../../common/services/catalog.service';

@Module({
  imports: [PrismaModule],
  controllers: [CartProductController],
  providers: [
    { provide: CART_PRODUCT_REPOSITORY, useClass: PrismaCartProductRepository },
    CreateCartProductUseCase,
    ListCartProductsUseCase,
    DeleteCartProductUseCase,
    { provide: CART_REPOSITORY, useClass: PrismaCartRepository },
    CatalogService,
  ],
})
export class CartProductModule {}
