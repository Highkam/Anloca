import { Injectable, Logger } from '@nestjs/common';

const axios = require('axios');

@Injectable()
export class AuthClientService {
  private readonly client: any;
  private readonly logger = new Logger(AuthClientService.name);

  constructor() {
    const baseURL = process.env.AUTH_URL || 'http://auth:3001';
    this.client = axios.create({ baseURL, timeout: 3000 });
  }

  async getSession(token?: string): Promise<{ id: number | null } | null> {
    try {
      const headers: any = {};
      if (token) headers['x-session-token'] = token;
      const res = await this.client.get('/auth/session', { headers });
      const data: any = res.data;
      return { id: data?.id ?? null };
    } catch (e) {
      this.logger.warn('Failed to get session from auth service');
      return null;
    }
  }
}
