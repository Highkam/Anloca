import { Injectable, Optional } from '@nestjs/common';
import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { User } from '../../domain/user.entity';

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
}
