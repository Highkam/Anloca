import { Module } from '@nestjs/common';
import { CART_REPOSITORY } from '../../../core/carts/application/tokens';
import { PrismaCartRepository } from '../../../infrastructure/prisma/prisma-cart.repository';
import { CreateCartUseCase } from '../../../core/carts/application/usecases/create-cart.usecase';
import { GetCartUseCase } from '../../../core/carts/application/usecases/get-cart.usecase';
import { ListCartsUseCase, ListAllCartsUseCase } from '../../../core/carts/application/usecases/list-cart.usecase';
import { DeleteCartUseCase } from '../../../core/carts/application/usecases/delete-cart.usecase';
import { CartController } from './cart.controller';
import { PrismaModule } from '../../../infrastructure/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CartController],
  providers: [
    { provide: CART_REPOSITORY, useClass: PrismaCartRepository },
    CreateCartUseCase,
    GetCartUseCase,
    ListCartsUseCase,
    ListAllCartsUseCase,
    DeleteCartUseCase,
  ],
})
export class CartModule {}
