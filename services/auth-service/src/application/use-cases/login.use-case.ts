import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../infrastructure/prisma/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(email: string, password: string): Promise<{ success: boolean; message: string }> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) return { success: false, message: 'User not found' };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { success: false, message: 'Invalid password' };

    return { success: true, message: 'Login successful' };
  }
}
