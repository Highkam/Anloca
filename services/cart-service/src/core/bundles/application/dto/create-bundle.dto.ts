import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBundleDto {
  @IsInt()
  @ApiProperty({ example: 123 })
  userId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Monthly bundle' })
  name: string;

  @IsInt()
  @ApiProperty({ example: 1, description: 'Period id for recurrence' })
  recurrenceId: number;
}

export class UpdateBundleDto {
  @ApiProperty({ example: 'Monthly bundle', required: false })
  @IsString()
  name?: string;

  @ApiProperty({ example: 1, required: false })
  @IsInt()
  recurrenceId?: number;
}
