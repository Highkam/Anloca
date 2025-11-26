import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../../infrastructure/prisma/user.repository';

@Injectable()
export class GetUserEmailUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: number): Promise<{ userId: number; email: string }> {
    const user = await this.userRepository.findById(userId);
    
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    return {
      userId: user.id_user,
      email: user.email,
    };
  }
}
