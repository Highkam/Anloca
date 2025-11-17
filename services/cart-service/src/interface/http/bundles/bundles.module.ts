import { Module } from '@nestjs/common';
import { BundlesController } from './bundles.controller';
import { CreateBundleUseCase } from '../../../core/bundles/application/usecases/create-bundle.usecase';
import { UpdateBundleUseCase } from '../../../core/bundles/application/usecases/update-bundle.usecase';
import { GetBundleUseCase } from '../../../core/bundles/application/usecases/get-bundle.usecase';
import { ListBundlesUseCase } from '../../../core/bundles/application/usecases/list-bundles.usecase';
import { DeleteBundleUseCase } from '../../../core/bundles/application/usecases/delete-bundle.usecase';
import { PrismaBundleRepository } from '../../../infrastructure/prisma/prisma-bundle.repository';
import { BUNDLE_REPOSITORY } from '../../../core/bundles/application/tokens';
import { PeriodsModule } from '../periods/periods.module';

@Module({
  imports: [PeriodsModule],
  controllers: [BundlesController],
  providers: [
    CreateBundleUseCase,
    UpdateBundleUseCase,
    GetBundleUseCase,
    ListBundlesUseCase,
    DeleteBundleUseCase,
    PrismaBundleRepository,
    { provide: BUNDLE_REPOSITORY, useClass: PrismaBundleRepository },
  ],
  exports: [],
})
export class BundlesModule {}
