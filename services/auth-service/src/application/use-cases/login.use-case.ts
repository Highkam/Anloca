import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../infrastructure/prisma/user.repository';
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class LoginUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  // store de sesiones en memoria: token -> { id_user, createdAt }
  private sessions = new Map<string, { id_user: number | null; createdAt: number }>();
  private sessionTtlMs = 1000 * 60 * 60 * 24; // 24h

  async execute(email: string, password: string): Promise<{ id_user: number | null; email: string; name: string; sessionToken: string }> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const stored = (user as any).password;
    let isMatch = false;

    // Detectar si la contraseña almacenada parece un hash bcrypt
    if (typeof stored === 'string' && /^\$2[aby]\$/.test(stored)) {
      isMatch = await bcrypt.compare(password, stored);
    } else {
      // Fallback para entradas legacy en texto plano
      isMatch = password === stored;
    }

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const id_user = (user as any).id_user ?? (user as any).id ?? null;

    // Generar token seguro y guardarlo
    const token = randomBytes(32).toString('hex');
    this.sessions.set(token, { id_user, createdAt: Date.now() });

    return {
      id_user,
      email: (user as any).email,
      name: (user as any).name,
      sessionToken: token,
    };
  }

  // Invalida sesión por token y retorna true si existía y fue eliminada
  async logout(token?: string): Promise<boolean> {
    if (!token) return false;
    return this.sessions.delete(token);
  }

  // Valida token y retorna id_user o null
  async validateSession(token?: string): Promise<number | null> {
    if (!token) return null;
    const data = this.sessions.get(token);
    if (!data) return null;
    // comprobar expiración
    if (Date.now() - data.createdAt > this.sessionTtlMs) {
      this.sessions.delete(token);
      return null;
    }
    return data.id_user;
  }

}
