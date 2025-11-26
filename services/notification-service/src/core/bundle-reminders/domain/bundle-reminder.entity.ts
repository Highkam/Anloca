export interface BundleReminder {
  id: number;
  userId: number;
  bundleId: number;
  frequencyDays: number;
  nextNotificationAt: Date;
  lastNotificationAt: Date | null;
  jobId: string | null;
  status: string;
}
