import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../infrastructure/prisma/user.repository';
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class LoginUseCase {
  constructor(private readonly userRepo: UserRepository) {}

 

  async execute(email: string, password: string): Promise<{ id_user: number | null; email: string; name: string; jwt: string }> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const stored = (user as any).password;
    let isMatch = false;

    if (typeof stored === 'string' && /^\$2[aby]\$/.test(stored)) {
      isMatch = await bcrypt.compare(password, stored);
    } else {
      isMatch = password === stored;
    }

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const id_user = (user as any).id_user ?? (user as any).id ?? null;

    // Genera el JWT
    const payload = {
      id_user,
      email: (user as any).email,
      name: (user as any).name,
      role_id: (user as any).role_id,
    };
    const secret = process.env.JWT_SECRET || 'default_secret';
    const jwtToken = jwt.sign(payload, secret, { expiresIn: '1h' });

    return {
      id_user,
      email: (user as any).email,
      name: (user as any).name,
      jwt: jwtToken,
    };
  }

  // Invalida sesión por token
  async logout(token?: string): Promise<boolean> {
    // En JWT, el cliente elimina el token
    return true;
  }

  // Valida el token y retorna el id_user o null
  async validateSession(token?: string): Promise<number | null> {
    if (!token) return null;
    const secret = process.env.JWT_SECRET || 'default_secret';
    try {
      const decoded: any = jwt.verify(token, secret);
      return decoded.id_user ?? decoded.id ?? null;
    } catch {
      return null;
    }
  }

}
