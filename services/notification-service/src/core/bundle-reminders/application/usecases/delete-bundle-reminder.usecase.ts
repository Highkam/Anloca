import { Injectable, Inject } from '@nestjs/common';
import { BundleReminderRepositoryPort } from '../../domain/bundle-reminder.repository.port';
import { BUNDLE_REMINDER_REPOSITORY } from '../tokens';

@Injectable()
export class DeleteBundleReminderUseCase {
  constructor(
    @Inject(BUNDLE_REMINDER_REPOSITORY)
    private readonly repository: BundleReminderRepositoryPort,
  ) {}

  async execute(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
