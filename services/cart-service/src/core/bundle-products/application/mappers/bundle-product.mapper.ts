import { BundleProduct } from '../../domain/bundle-product.entity';
import { BundleProductDto } from '../dto/bundle-product.dto';

export class BundleProductMapper {
  static toDto(b: BundleProduct): BundleProductDto {
    return {
      id: b.id,
      bundleId: b.bundleId,
      productId: b.productId,
      amount: b.amount,
    };
  }
}