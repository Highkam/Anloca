import { ApiProperty } from '@nestjs/swagger';

export class UpdateBundleProductDto {
  @ApiProperty({ example: 123, required: false })
  productId?: number;

  @ApiProperty({ example: 2, required: false })
  amount?: number;
}