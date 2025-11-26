import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, Min } from 'class-validator';

export class CreateBundleReminderDto {
  @ApiProperty({ example: 123, description: 'ID del usuario' })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({ example: 55, description: 'ID del bundle' })
  @IsInt()
  @IsPositive()
  bundleId: number;

  @ApiProperty({ example: 7, description: 'Frecuencia en días' })
  @IsInt()
  @Min(1)
  frequencyDays: number;
}
