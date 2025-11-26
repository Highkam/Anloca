import { BundleReminder } from '../../domain/bundle-reminder.entity';
import { BundleReminderDto } from '../dto/bundle-reminder.dto';

export class BundleReminderMapper {
  static toDto(entity: BundleReminder): BundleReminderDto {
    return {
      id: entity.id,
      userId: entity.userId,
      bundleId: entity.bundleId,
      frequencyDays: entity.frequencyDays,
      nextNotificationAt: entity.nextNotificationAt,
      lastNotificationAt: entity.lastNotificationAt,
      jobId: entity.jobId,
      status: entity.status,
    };
  }
}
