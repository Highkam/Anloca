import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { CreateUserUseCase } from './create-user.use-case';
import { UserRepository } from '../../infrastructure/prisma/user.repository';
import { User } from '../../domain/user.entity';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const mockUserRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get(UserRepository);
  });

  describe('execute', () => {
    const createUserRequest = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role_id: 1,
    };

    it('should create a new user successfully', async () => {
      const hashedPassword = 'hashedPassword123';
      const createdUser = new User(
        1,
        'John Doe',
        'john@example.com',
        hashedPassword,
        new Date(),
        1,
      );

      userRepository.findByEmail.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      userRepository.create.mockResolvedValue(createdUser);

      const result = await useCase.execute(createUserRequest);

      expect(userRepository.findByEmail).toHaveBeenCalledWith('john@example.com');
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(userRepository.create).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        role_id: 1,
      });
      expect(result).toEqual({
        id_user: 1,
        name: 'John Doe',
        email: 'john@example.com',
        register_date: createdUser.register_date,
        role_id: 1,
      });
    });

    it('should throw ConflictException if user already exists', async () => {
      const existingUser = new User(
        1,
        'Existing User',
        'john@example.com',
        'hashedPassword',
        new Date(),
        1,
      );

      userRepository.findByEmail.mockResolvedValue(existingUser);

      await expect(useCase.execute(createUserRequest)).rejects.toThrow(
        ConflictException,
      );
      expect(userRepository.findByEmail).toHaveBeenCalledWith('john@example.com');
      expect(userRepository.create).not.toHaveBeenCalled();
    });
  });
});