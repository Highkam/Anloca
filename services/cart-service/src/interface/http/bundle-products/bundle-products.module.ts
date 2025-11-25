import { Module } from '@nestjs/common';
import { BundleProductsController } from './bundle-products.controller';
import { PrismaBundleProductRepository } from '../../../infrastructure/prisma/prisma-bundle-product.repository';
import { BUNDLE_PRODUCT_REPOSITORY } from '../../../core/bundle-products/application/tokens';
import { CreateBundleProductUseCase } from '../../../core/bundle-products/application/usecases/create-bundle-product.usecase';
import { UpdateBundleProductUseCase } from '../../../core/bundle-products/application/usecases/update-bundle-product.usecase';
import { GetBundleProductUseCase } from '../../../core/bundle-products/application/usecases/get-bundle-product.usecase';
import { ListBundleProductsUseCase } from '../../../core/bundle-products/application/usecases/list-bundle-products.usecase';
import { DeleteBundleProductUseCase } from '../../../core/bundle-products/application/usecases/delete-bundle-product.usecase';
import { BundlesModule } from '../bundles/bundles.module';

@Module({
  imports: [BundlesModule],
  controllers: [BundleProductsController],
  providers: [
    CreateBundleProductUseCase,
    UpdateBundleProductUseCase,
    GetBundleProductUseCase,
    ListBundleProductsUseCase,
    DeleteBundleProductUseCase,
    { provide: BUNDLE_PRODUCT_REPOSITORY, useClass: PrismaBundleProductRepository },
  ],
  exports: [],
})
export class BundleProductsModule {}