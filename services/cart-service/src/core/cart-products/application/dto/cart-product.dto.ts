import { ApiProperty } from '@nestjs/swagger';

export class CartProductDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 1 })
  cartId!: number;

  @ApiProperty({ example: 101 })
  productId!: number;

  @ApiProperty({ example: 2, description: 'Cantidad del producto' })
  amount!: number;
}