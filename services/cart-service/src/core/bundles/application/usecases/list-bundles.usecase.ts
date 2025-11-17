import { Inject, Injectable } from '@nestjs/common';
import type { BundleRepositoryPort } from '../../domain/bundle.repository.port';
import { BUNDLE_REPOSITORY } from '../tokens';
import { Bundle } from '../../domain/bundle.entity';

@Injectable()
export class ListBundlesUseCase {
  constructor(@Inject(BUNDLE_REPOSITORY) private readonly repository: BundleRepositoryPort) {}

  async execute(): Promise<Bundle[]> {
    return this.repository.findAll();
  }
}
