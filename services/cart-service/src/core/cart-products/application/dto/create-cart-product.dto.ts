import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';


export class CreateCartProductDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  cartId!: number;

  @ApiProperty({ example: 101 })
  @IsInt()
  @IsPositive()
  productId!: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  @IsPositive()
  amount!: number;
}