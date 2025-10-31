import { Injectable, Optional } from '@nestjs/common';
import { PrismaClient, Role as PrismaRole } from '@prisma/client';
import { Role } from '../../domain/role.entity';

export interface CreateRoleData {
  name: string;
}

@Injectable()
export class RoleRepository {
  private prisma: PrismaClient;

  constructor(@Optional() prisma?: PrismaClient) {
    this.prisma = prisma ?? new PrismaClient();
  }

  async create(data: CreateRoleData): Promise<Role> {
    const role: PrismaRole = await this.prisma.role.create({
      data: {
        name: data.name,
      },
    });
    return new Role(role.id_role, role.name);
  }

  async findByName(name: string): Promise<Role | null> {
    const role: PrismaRole | null = await this.prisma.role.findUnique({
      where: { name },
    });
    if (!role) return null;
    return new Role(role.id_role, role.name);
  }

  async findById(id_role: number): Promise<Role | null> {
    const role: PrismaRole | null = await this.prisma.role.findUnique({
      where: { id_role },
    });
    if (!role) return null;
    return new Role(role.id_role, role.name);
  }
}