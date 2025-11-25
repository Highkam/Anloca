import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PERIOD_REPOSITORY } from '../tokens';
import { Period } from '../../domain/period.entity';

@Injectable()
export class GetPeriodUseCase {
  constructor(@Inject(PERIOD_REPOSITORY) private readonly repo: any) {}

  async execute(id: number): Promise<Period> {
    const p = await (this.repo as any).findById(id);
    if (!p) throw new NotFoundException('Period not found');
    return new Period(p.id, p.name, p.duration_days ?? p.durationDays);
  }
}
