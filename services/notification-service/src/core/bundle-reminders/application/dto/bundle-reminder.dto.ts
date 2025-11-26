import { ApiProperty } from '@nestjs/swagger';

export class BundleReminderDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 123 })
  userId: number;

  @ApiProperty({ example: 55 })
  bundleId: number;

  @ApiProperty({ example: 7 })
  frequencyDays: number;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  nextNotificationAt: Date;

  @ApiProperty({ example: '2024-12-25T00:00:00.000Z', nullable: true })
  lastNotificationAt: Date | null;

  @ApiProperty({ example: 'job-uuid-123', nullable: true })
  jobId: string | null;

  @ApiProperty({ example: 'active' })
  status: string;
}
