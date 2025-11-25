import { Bundle } from '../../domain/bundle.entity';
import { BundleDto } from '../dto/bundle.dto';

export class BundleMapper {
  static toDto(entity: Bundle): BundleDto {
    return {
      id: entity.id,
      userId: entity.userId,
      name: entity.name,
      recurrenceId: entity.recurrenceId,
      createdAt: entity.createdAt,
    };
  }
}
