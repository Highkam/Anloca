import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BundleReminderRepositoryPort } from '../../core/bundle-reminders/domain/bundle-reminder.repository.port';
import { BundleReminder } from '../../core/bundle-reminders/domain/bundle-reminder.entity';

@Injectable()
export class BundleReminderRepository implements BundleReminderRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, bundleId: number, frequencyDays: number): Promise<BundleReminder> {
    const nextNotificationAt = new Date();
    nextNotificationAt.setDate(nextNotificationAt.getDate() + frequencyDays);

    return this.prisma.bundleReminder.create({
      data: {
        userId,
        bundleId,
        frequencyDays,
        nextNotificationAt,
        status: 'active',
      },
    });
  }

  async findById(id: number): Promise<BundleReminder | null> {
    return this.prisma.bundleReminder.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: number): Promise<BundleReminder[]> {
    return this.prisma.bundleReminder.findMany({
      where: { userId },
    });
  }

  async update(id: number, frequencyDays: number): Promise<BundleReminder> {
    return this.prisma.bundleReminder.update({
      where: { id },
      data: { frequencyDays },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.bundleReminder.delete({
      where: { id },
    });
  }
}
