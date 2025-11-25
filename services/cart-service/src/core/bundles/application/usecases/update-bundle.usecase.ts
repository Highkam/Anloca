import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { BundleRepositoryPort } from '../../domain/bundle.repository.port';
import { BUNDLE_REPOSITORY } from '../tokens';
import type { PeriodRepositoryPort } from '../../../periods/domain/period.repository.port';
import { PERIOD_REPOSITORY } from '../../../periods/application/tokens';
import { Bundle } from '../../domain/bundle.entity';

@Injectable()
export class UpdateBundleUseCase {
  constructor(
    @Inject(BUNDLE_REPOSITORY) private readonly repository: BundleRepositoryPort,
    @Inject(PERIOD_REPOSITORY) private readonly periodRepository: PeriodRepositoryPort,
  ) {}

  async execute(id: number, payload: { name?: string; recurrenceId?: number }): Promise<Bundle> {
    if (payload.recurrenceId) {
      const period = await this.periodRepository.findById(payload.recurrenceId);
      if (!period) throw new NotFoundException('Recurrence Period not found');
    }

    const updated = await this.repository.update(id, payload);
    if (!updated) throw new NotFoundException('Bundle not found');
    return updated;
  }
}
