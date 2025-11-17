import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { BundleRepositoryPort } from '../../domain/bundle.repository.port';
import { BUNDLE_REPOSITORY } from '../tokens';
import type { PeriodRepositoryPort } from '../../../periods/domain/period.repository.port';
import { PERIOD_REPOSITORY } from '../../../periods/application/tokens';
import { Bundle } from '../../domain/bundle.entity';

@Injectable()
export class CreateBundleUseCase {
  constructor(
    @Inject(BUNDLE_REPOSITORY) private readonly repository: BundleRepositoryPort,
    @Inject(PERIOD_REPOSITORY) private readonly periodRepository: PeriodRepositoryPort,
  ) {}

  async execute(payload: { userId: number; name: string; recurrenceId: number }): Promise<Bundle> {
    const period = await this.periodRepository.findById(payload.recurrenceId);
    if (!period) throw new NotFoundException('Recurrence Period not found');

    return this.repository.create(payload);
  }
}
