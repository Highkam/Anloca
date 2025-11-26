import { Injectable, Inject } from '@nestjs/common';
import { BundleReminderRepositoryPort } from '../../domain/bundle-reminder.repository.port';
import { BUNDLE_REMINDER_REPOSITORY } from '../tokens';
import { BundleReminder } from '../../domain/bundle-reminder.entity';

@Injectable()
export class CreateBundleReminderUseCase {
  constructor(
    @Inject(BUNDLE_REMINDER_REPOSITORY)
    private readonly repository: BundleReminderRepositoryPort,
  ) {}

  async execute(userId: number, bundleId: number, frequencyDays: number): Promise<BundleReminder> {
    return this.repository.create(userId, bundleId, frequencyDays);
  }
}
