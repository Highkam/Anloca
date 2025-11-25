import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BundleRepositoryPort } from '../../core/bundles/domain/bundle.repository.port';
import { Bundle } from '../../core/bundles/domain/bundle.entity';

@Injectable()
export class PrismaBundleRepository implements BundleRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: { userId: number; name: string; recurrenceId: number }): Promise<Bundle> {
    const created = await this.prisma.bundle.create({
      data: {
        userId: payload.userId,
        name: payload.name,
        recurrenceId: payload.recurrenceId,
      },
    });
    return new Bundle(created.id, created.userId, created.name, created.recurrenceId, created.createdAt);
  }

  async update(id: number, payload: { name?: string; recurrenceId?: number }): Promise<Bundle | null> {
    const updated = await this.prisma.bundle.update({
      where: { id },
      data: {
        name: payload.name,
        recurrenceId: payload.recurrenceId,
      },
    });
    return new Bundle(updated.id, updated.userId, updated.name, updated.recurrenceId, updated.createdAt);
  }

  async findById(id: number): Promise<Bundle | null> {
    const found = await this.prisma.bundle.findUnique({ where: { id } });
    if (!found) return null;
    return new Bundle(found.id, found.userId, found.name, found.recurrenceId, found.createdAt);
  }

  async findAll(): Promise<Bundle[]> {
    const list = await this.prisma.bundle.findMany();
    return list.map(b => new Bundle(b.id, b.userId, b.name, b.recurrenceId, b.createdAt));
  }

  async delete(id: number): Promise<void> {
    await this.prisma.bundle.delete({ where: { id } });
  }
}
