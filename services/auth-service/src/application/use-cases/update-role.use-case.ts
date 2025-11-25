import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { RoleRepository } from '../../infrastructure/prisma/role.repository';

export interface UpdateRoleRequest {
  id_role: number;
  name: string;
}

export interface UpdateRoleResponse {
  id_role: number;
  name: string;
}

@Injectable()
export class UpdateRoleUseCase {
  constructor(private readonly roleRepo: RoleRepository) {}

  async execute(request: UpdateRoleRequest): Promise<UpdateRoleResponse> {
    // Check role exists
    const existing = await this.roleRepo.findById(request.id_role);
    if (!existing) throw new NotFoundException('Role not found');

    // Check if another role with the same name exists
    const byName = await this.roleRepo.findByName(request.name);
    if (byName && byName.id_role !== request.id_role) {
      throw new ConflictException('Another role with this name already exists');
    }

    const updated = await this.roleRepo.update(request.id_role, { name: request.name });
    return { id_role: updated.id_role, name: updated.name };
  }
}
