import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../infrastructure/prisma/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(dto: CreateUserDto) {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const created = await this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashed,
      role_id: dto.role_id,
    });

    // devolver sin contraseña
    return {
      id_user: created.id_user,
      name: created.name,
      email: created.email,
      register_date: created.register_date,
      role_id: created.role_id,
    };
  }
}
