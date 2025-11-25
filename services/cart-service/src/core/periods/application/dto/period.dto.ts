import { ApiProperty } from '@nestjs/swagger';

export class PeriodDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Short promo' })
  name: string;

  @ApiProperty({ example: 30 })
  durationDays: number;
}
