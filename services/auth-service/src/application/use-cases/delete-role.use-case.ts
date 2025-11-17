import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from '../../infrastructure/prisma/role.repository';

@Injectable()
export class DeleteRoleUseCase {
  constructor(private readonly roleRepo: RoleRepository) {}

  async execute(id_role: number): Promise<void> {
    const existing = await this.roleRepo.findById(id_role);
    if (!existing) throw new NotFoundException('Role not found');
    await this.roleRepo.delete(id_role);
  }
}
