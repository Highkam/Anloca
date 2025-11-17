import { Period } from '../../domain/period.entity';
import { PeriodDto } from '../dto/period.dto';

export class PeriodMapper {
  static toDto(p: Period): PeriodDto {
    return {
      id: p.id,
      name: p.name,
      durationDays: p.durationDays,
    };
  }
}
