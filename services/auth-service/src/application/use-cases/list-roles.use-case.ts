import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../../infrastructure/prisma/role.repository';
import { Role } from '../../domain/role.entity';

export interface ListRolesResponse {
  id_role: number;
  name: string;
}

@Injectable()
export class ListRolesUseCase {
  constructor(private readonly roleRepo: RoleRepository) {}

  async execute(): Promise<ListRolesResponse[]> {
    const roles: Role[] = await this.roleRepo.findAll();
    return roles.map(r => ({ id_role: r.id_role, name: r.name }));
  }
}
