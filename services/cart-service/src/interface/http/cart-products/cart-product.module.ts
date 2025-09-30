import { Module } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma.service';
import { PrismaCartProductRepository } from '../../../infrastructure/prisma/prisma-cart-product.repository';
import { CART_PRODUCT_REPOSITORY } from '../../../core/cart-products/application/tokens';
import { CreateCartProductUseCase } from '../../../core/cart-products/application/usecases/create-cart-product.usecase';
import { ListCartProductsUseCase } from '../../../core/cart-products/application/usecases/list-cart-products.usecase';
import { CartProductController } from './cart-product.controller';
import { CART_REPOSITORY } from '../../../core/carts/application/tokens';
import { PrismaCartRepository } from '../../../infrastructure/prisma/prisma-cart.repository';

@Module({
  controllers: [CartProductController],
  providers: [
    PrismaService,
    { provide: CART_PRODUCT_REPOSITORY, useClass: PrismaCartProductRepository },
    CreateCartProductUseCase,
    ListCartProductsUseCase,
    { provide: CART_REPOSITORY, useClass: PrismaCartRepository },
  ],
})
export class CartProductModule {}
