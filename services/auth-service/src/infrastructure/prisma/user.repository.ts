import { Injectable, Optional } from '@nestjs/common';
import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { User } from '../../domain/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository'; // importa la interfaz

@Injectable()
export class UserRepository implements IUserRepository { // implementa la interfaz
  private prisma: PrismaClient;

  constructor(@Optional() prisma?: PrismaClient) {
    this.prisma = prisma ?? new PrismaClient();
  }

  async findByEmail(email: string): Promise<User | null> {
    const user: PrismaUser | null = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) return null;
    return new User(
      user.id_user,
      user.name,
      user.email,
      user.password,
      user.register_date,
      user.role_id,
    );
  }

  // Nuevo método: crear usuario en la BD
  async create(data: {
    name: string;
    email: string;
    password: string;
    role_id?: number;
  }): Promise<User> {
    const user: PrismaUser = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        register_date: new Date(),
        role_id: data.role_id ?? 2, // ajustar rol por defecto si aplica
      },
    });

    return new User(
      user.id_user,
      user.name,
      user.email,
      user.password,
      user.register_date,
      user.role_id,
    );
  }
}
