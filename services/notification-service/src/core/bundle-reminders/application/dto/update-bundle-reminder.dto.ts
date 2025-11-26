import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateBundleReminderDto {
  @ApiProperty({ example: 14, description: 'Nueva frecuencia en días' })
  @IsInt()
  @Min(1)
  @IsOptional()
  frequencyDays?: number;
}
