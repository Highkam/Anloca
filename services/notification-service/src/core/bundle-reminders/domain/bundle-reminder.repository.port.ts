import { BundleReminder } from './bundle-reminder.entity';

export interface BundleReminderRepositoryPort {
  create(userId: number, bundleId: number, frequencyDays: number): Promise<BundleReminder>;
  findById(id: number): Promise<BundleReminder | null>;
  findByUserId(userId: number): Promise<BundleReminder[]>;
  update(id: number, frequencyDays: number): Promise<BundleReminder>;
  delete(id: number): Promise<void>;
}
