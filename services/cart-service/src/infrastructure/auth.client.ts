import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthClientService {
  private readonly client: any;
  private readonly logger = new Logger(AuthClientService.name);

  constructor() {
    const baseURL = 'http://auth:3001';
    this.client = axios.create({ baseURL, timeout: 3000 });
  }

  async getSession(token?: string): Promise<{ id: number | null } | null> {
    try {
      const headers: any = {};
      if (token) headers['x-session-token'] = token;
      
      this.logger.debug(`Calling auth service: /api/auth/session with token: ${token}`);
      
      const res = await this.client.get('/api/auth/session', { headers });
      const data: any = res.data;
      
      this.logger.debug(`Auth service response: ${JSON.stringify(data)}`);
      
      return { id: data?.id ?? null };
    } catch (e: any) {
      this.logger.error(`Failed to get session from auth service: ${e.message}`);
      if (e.response) {
        this.logger.error(`Response status: ${e.response.status}`);
        this.logger.error(`Response data: ${JSON.stringify(e.response.data)}`);
      }
      return null;
    }
  }
}