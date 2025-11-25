import { ApiProperty } from '@nestjs/swagger';

export class CreateBundleProductDto {
  @ApiProperty({ example: 1, description: 'Bundle id' })
  bundleId: number;

  @ApiProperty({ example: 123, description: 'Product id' })
  productId: number;

  @ApiProperty({ example: 2, description: 'Amount' })
  amount: number;
}