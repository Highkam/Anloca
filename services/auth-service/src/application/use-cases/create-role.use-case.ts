import { ConflictException, Injectable } from '@nestjs/common';
import { RoleRepository } from '../../infrastructure/prisma/role.repository';
import { Role } from '../../domain/role.entity';

export interface CreateRoleRequest {
  name: string;
}

export interface CreateRoleResponse {
  id_role: number;
  name: string;
}

@Injectable()
export class CreateRoleUseCase {
  constructor(private readonly roleRepo: RoleRepository) {}

  async execute(request: CreateRoleRequest): Promise<CreateRoleResponse> {
    // Check if role already exists
    const existingRole = await this.roleRepo.findByName(request.name);
    if (existingRole) {
      throw new ConflictException('Role with this name already exists');
    }

    // Create role
    const role = await this.roleRepo.create({
      name: request.name,
    });

    return {
      id_role: role.id_role,
      name: role.name,
    };
  }
}