import { ApiProperty } from '@nestjs/swagger';

export class BundleDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 123 })
  userId: number;

  @ApiProperty({ example: 'Monthly bundle' })
  name: string;

  @ApiProperty({ example: 1, description: 'Period id for recurrence' })
  recurrenceId: number;

  @ApiProperty({ example: '2025-11-16T00:00:00.000Z' })
  createdAt: Date;
}
