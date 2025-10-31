import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserRepository } from '../infrastructure/prisma/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Body() dto: CreateUserDto) {
    // Verifica si el email ya existe
    const exists = await this.userRepository.findByEmail(dto.email);
    if (exists) {
      return { message: 'Email already in use' };
    }
    // Hashea la contraseña
    const hashed = await bcrypt.hash(dto.password, 10);
    // Crea el usuario
    const user = await this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashed,
      role_id: dto.role_id,
    });
    // Retorna el usuario sin la contraseña
    return {
      id_user: user.id_user,
      name: user.name,
      email: user.email,
      register_date: user.register_date,
      role_id: user.role_id,
    };
  }
}
