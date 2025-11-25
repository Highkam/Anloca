import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PERIOD_REPOSITORY } from '../tokens';
import { Period } from '../../domain/period.entity';

@Injectable()
export class UpdatePeriodUseCase {
  constructor(@Inject(PERIOD_REPOSITORY) private readonly repo: any) {}

  async execute(id: number, data: { name?: string; durationDays?: number }): Promise<Period> {
    const existing = await (this.repo as any).findById(id);
    if (!existing) throw new NotFoundException('Period not found');
    const p = await (this.repo as any).update(id, data);
    return new Period(p.id, p.name, p.duration_days ?? p.durationDays);
  }
}
