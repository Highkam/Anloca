import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { CreateRoleUseCase } from './create-role.use-case';
import { RoleRepository } from '../../infrastructure/prisma/role.repository';
import { Role } from '../../domain/role.entity';

describe('CreateRoleUseCase', () => {
  let useCase: CreateRoleUseCase;
  let roleRepository: jest.Mocked<RoleRepository>;

  beforeEach(async () => {
    const mockRoleRepository = {
      findByName: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateRoleUseCase,
        { provide: RoleRepository, useValue: mockRoleRepository },
      ],
    }).compile();

    useCase = module.get<CreateRoleUseCase>(CreateRoleUseCase);
    roleRepository = module.get(RoleRepository);
  });

  describe('execute', () => {
    const createRoleRequest = {
      name: 'admin',
    };

    it('should create a new role successfully', async () => {
      const createdRole = new Role(1, 'admin');

      roleRepository.findByName.mockResolvedValue(null);
      roleRepository.create.mockResolvedValue(createdRole);

      const result = await useCase.execute(createRoleRequest);

      expect(roleRepository.findByName).toHaveBeenCalledWith('admin');
      expect(roleRepository.create).toHaveBeenCalledWith({
        name: 'admin',
      });
      expect(result).toEqual({
        id_role: 1,
        name: 'admin',
      });
    });

    it('should throw ConflictException if role already exists', async () => {
      const existingRole = new Role(1, 'admin');

      roleRepository.findByName.mockResolvedValue(existingRole);

      await expect(useCase.execute(createRoleRequest)).rejects.toThrow(
        ConflictException,
      );
      expect(roleRepository.findByName).toHaveBeenCalledWith('admin');
      expect(roleRepository.create).not.toHaveBeenCalled();
    });
  });
});