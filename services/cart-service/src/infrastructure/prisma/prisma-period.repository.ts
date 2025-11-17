import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Period } from '../../core/periods/domain/period.entity';
import { PeriodRepositoryPort } from '../../core/periods/domain/period.repository.port';

@Injectable()
export class PrismaPeriodRepository implements PeriodRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { name: string; durationDays: number }): Promise<Period> {
    const p = await this.prisma.period.create({
      data: {
        name: data.name,
        duration_days: data.durationDays,
      },
    });
    return new Period(p.id, p.name, p.duration_days);
  }

  async update(id: number, data: { name?: string; durationDays?: number }): Promise<Period> {
    const p = await this.prisma.period.update({
      where: { id },
      data: {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.durationDays !== undefined ? { duration_days: data.durationDays } : {}),
      },
    });
    return new Period(p.id, p.name, p.duration_days);
  }

  async findById(id: number): Promise<Period | null> {
    const p = await this.prisma.period.findUnique({ where: { id } });
    return p ? new Period(p.id, p.name, p.duration_days) : null;
  }

  async findAll(): Promise<Period[]> {
    const all = await this.prisma.period.findMany();
    return all.map(p => new Period(p.id, p.name, p.duration_days));
  }

  async delete(id: number): Promise<void> {
    await this.prisma.period.delete({ where: { id } });
  }
}
