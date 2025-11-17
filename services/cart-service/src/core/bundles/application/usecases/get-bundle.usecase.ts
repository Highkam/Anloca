import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { BundleRepositoryPort } from '../../domain/bundle.repository.port';
import { BUNDLE_REPOSITORY } from '../tokens';
import { Bundle } from '../../domain/bundle.entity';

@Injectable()
export class GetBundleUseCase {
  constructor(@Inject(BUNDLE_REPOSITORY) private readonly repository: BundleRepositoryPort) {}

  async execute(id: number): Promise<Bundle> {
    const bundle = await this.repository.findById(id);
    if (!bundle) throw new NotFoundException('Bundle not found');
    return bundle;
  }
}
