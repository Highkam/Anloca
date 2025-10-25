import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as http from 'http';
import { Request } from 'express';

@Injectable()
export class SessionRequiredGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = this.extractToken(req);
    if (!token) throw new UnauthorizedException('Session token missing');

    const ok = await this.validateSession(token);
    if (!ok) throw new UnauthorizedException('Invalid session token');
    return true;
  }

  private extractToken(req: Request): string | undefined {
    const auth = (req.headers['authorization'] as string) || undefined;
    const header = (req.headers['x-session-token'] as string) || undefined;
    const query = (req.query && (req.query as any).token) || undefined;
    if (header) return header;
    if (query) return query as string;
    if (auth && auth.startsWith('Bearer ')) return auth.slice(7);
    return undefined;
  }

  private validateSession(token: string): Promise<boolean> {
    const path = `/auth/session?token=${encodeURIComponent(token)}`;
    const options: http.RequestOptions = {
      hostname: 'localhost',
      port: 3003,
      path,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    };

    return new Promise((resolve) => {
      const req = http.request(options, res => {
        let data = '';
        res.on('data', chunk => (data += chunk));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            resolve(Boolean(parsed && parsed.valid === true));
          } catch (e) {
            resolve(false);
          }
        });
      });
      req.on('error', () => resolve(false));
      req.end();
    });
  }
}
