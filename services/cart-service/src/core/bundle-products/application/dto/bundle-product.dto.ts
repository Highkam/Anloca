import { ApiProperty } from '@nestjs/swagger';

export class BundleProductDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  bundleId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  amount: number;
}