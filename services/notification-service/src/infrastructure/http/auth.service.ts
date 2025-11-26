import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';

interface AuthUserResponse {
  userId: number;
  email: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly authUrl: string;

  constructor() {
    this.authUrl = process.env.AUTH_SERVICE_URL || 'http://auth:3001/api';
  }

  async getUserEmail(userId: number): Promise<string> {
    try {
      const response = await fetch(`${this.authUrl}/users/${userId}/email`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new HttpException(`Usuario ${userId} no encontrado`, HttpStatus.NOT_FOUND);
        }
        throw new HttpException('Error al consultar auth-service', HttpStatus.SERVICE_UNAVAILABLE);
      }

      const data: AuthUserResponse = await response.json();
      return data.email;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Error comunicándose con auth-service: ${error.message}`);
      throw new HttpException('Error de comunicación con auth-service', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
