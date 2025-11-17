import { Module } from '@nestjs/common';
import { PeriodsController } from './periods.controller';
import { PrismaPeriodRepository } from '../../../infrastructure/prisma/prisma-period.repository';
import { PERIOD_REPOSITORY } from '../../../core/periods/application/tokens';
import { CreatePeriodUseCase } from '../../../core/periods/application/usecases/create-period.usecase';
import { UpdatePeriodUseCase } from '../../../core/periods/application/usecases/update-period.usecase';
import { GetPeriodUseCase } from '../../../core/periods/application/usecases/get-period.usecase';
import { ListPeriodsUseCase } from '../../../core/periods/application/usecases/list-periods.usecase';
import { DeletePeriodUseCase } from '../../../core/periods/application/usecases/delete-period.usecase';
import { PrismaModule } from '../../../infrastructure/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PeriodsController],
  providers: [
    { provide: PERIOD_REPOSITORY, useClass: PrismaPeriodRepository },
    CreatePeriodUseCase,
    UpdatePeriodUseCase,
    GetPeriodUseCase,
    ListPeriodsUseCase,
    DeletePeriodUseCase,
  ],
  exports: [PERIOD_REPOSITORY],
})
export class PeriodsModule {}
