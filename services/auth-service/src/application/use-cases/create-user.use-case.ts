import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../infrastructure/prisma/user.repository';
import { User } from '../../domain/user.entity';

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role_id: number;
}

export interface CreateUserResponse {
  id_user: number;
  name: string;
  email: string;
  register_date: Date;
  role_id: number;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    // Check if user already exists
    const existingUser = await this.userRepo.findByEmail(request.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(request.password, saltRounds);

    // Create user
    const user = await this.userRepo.create({
      name: request.name,
      email: request.email,
      password: hashedPassword,
      role_id: request.role_id,
    });

    return {
      id_user: user.id_user,
      name: user.name,
      email: user.email,
      register_date: user.register_date,
      role_id: user.role_id,
    };
  }
}