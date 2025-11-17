import { Injectable, Inject } from '@nestjs/common';
import { PERIOD_REPOSITORY } from '../tokens';
import { Period } from '../../domain/period.entity';

@Injectable()
export class CreatePeriodUseCase {
  constructor(@Inject(PERIOD_REPOSITORY) private readonly repo: any) {}

  async execute(data: { name: string; durationDays: number }): Promise<Period> {
    const p = await (this.repo as any).create(data);
    return new Period(p.id, p.name, p.duration_days ?? p.durationDays);
  }
}
