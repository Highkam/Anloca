import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ example: 42, description: 'ID del usuario para crear el carrito' })
  @IsInt()
  @IsPositive()
  userId!: number;
}