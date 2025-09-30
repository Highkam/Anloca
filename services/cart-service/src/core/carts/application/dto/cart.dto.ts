import { ApiProperty } from '@nestjs/swagger';

export class CartDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 42, description: 'ID del usuario dueño del carrito' })
  userId!: number;

  @ApiProperty({ example: '2025-09-29T10:00:00Z', type: String })
  createdAt!: Date;

  @ApiProperty({ example: 'open', description: 'Estado del carrito' })
  state!: string;
}
