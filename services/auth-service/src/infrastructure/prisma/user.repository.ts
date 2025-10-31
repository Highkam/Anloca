import { Injectable, Optional } from '@nestjs/common';
import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { User } from '../../domain/user.entity';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role_id: number;
}

@Injectable()
export class UserRepository {
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

  async create(data: CreateUserData): Promise<User> {
    const user: PrismaUser = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: data.role_id,
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
