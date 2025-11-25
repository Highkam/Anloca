import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { BundleRepositoryPort } from '../../domain/bundle.repository.port';
import { BUNDLE_REPOSITORY } from '../tokens';

@Injectable()
export class DeleteBundleUseCase {
  constructor(@Inject(BUNDLE_REPOSITORY) private readonly repository: BundleRepositoryPort) {}

  async execute(id: number): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) throw new NotFoundException('Bundle not found');
    await this.repository.delete(id);
  }
}
