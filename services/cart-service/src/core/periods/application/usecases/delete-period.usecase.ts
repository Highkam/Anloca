import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PERIOD_REPOSITORY } from '../tokens';

@Injectable()
export class DeletePeriodUseCase {
  constructor(@Inject(PERIOD_REPOSITORY) private readonly repo: any) {}

  async execute(id: number) {
    const existing = await (this.repo as any).findById(id);
    if (!existing) throw new NotFoundException('Period not found');
    await (this.repo as any).delete(id);
  }
}
