import { Injectable, Inject } from '@nestjs/common';
import { PERIOD_REPOSITORY } from '../tokens';
import { Period } from '../../domain/period.entity';

@Injectable()
export class ListPeriodsUseCase {
  constructor(@Inject(PERIOD_REPOSITORY) private readonly repo: any) {}

  async execute(): Promise<Period[]> {
    const list = await (this.repo as any).findAll();
    return list.map((p: any) => new Period(p.id, p.name, p.duration_days ?? p.durationDays));
  }
}
