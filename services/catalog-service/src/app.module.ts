// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infraestructure/database/prisma/prisma.module';
import { AppController } from './presentation/controllers/app.controller'; // ← Agregar esta línea
import { ProductsController } from './presentation/controllers/products.controller';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { GetProductsUseCase } from './application/use-cases/get-products.use-case';
import { GetProductUseCase } from './application/use-cases/get-product.use-case';
import { UpdateProductUseCase } from './application/use-cases/update-product.use-case';
import { DeleteProductUseCase } from './application/use-cases/delete-product.use-case';
import { ProductPrismaRepository } from './infraestructure/database/repositories/product-prisma.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
  ],
  controllers: [AppController, ProductsController], // ← Agregar AppController aquí
  providers: [
    // Use Cases
    CreateProductUseCase,
    GetProductsUseCase,
    GetProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    
    // Repository implementation
    {
      provide: 'ProductRepository',
      useClass: ProductPrismaRepository,
    },
  ],
})
export class AppModule {}