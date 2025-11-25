import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePeriodDto {
  @ApiProperty({ example: 'Short promo' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 30 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  durationDays: number;
}

export class UpdatePeriodDto {
  @ApiProperty({ example: 'Short promo', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 30, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  durationDays?: number;
}
