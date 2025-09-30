import { Module } from '@nestjs/common';
import { CART_REPOSITORY } from '../../../core/carts/application/tokens';
import { PrismaCartRepository } from '../../../infrastructure/prisma/prisma-cart.repository';
import { PrismaService } from '../../../infrastructure/prisma.service';
import { CreateCartUseCase } from '../../../core/carts/application/usecases/create-cart.usecase';
import { GetCartUseCase } from '../../../core/carts/application/usecases/get-cart.usecase';
import { ListCartsUseCase } from '../../../core/carts/application/usecases/list-cart.usecase';
import { DeleteCartUseCase } from '../../../core/carts/application/usecases/delete-cart.usecase';
import { CartController } from './cart.controller';

@Module({
  controllers: [CartController],
  providers: [
    PrismaService,
    { provide: CART_REPOSITORY, useClass: PrismaCartRepository },
    CreateCartUseCase,
    GetCartUseCase,
    ListCartsUseCase,
    DeleteCartUseCase,
  ],
})
export class CartModule {}
