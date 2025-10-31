import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as http from 'http';
import { Request } from 'express';

@Injectable()
export class SessionRequiredGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = this.extractToken(req);
    if (!token) throw new UnauthorizedException('Session token missing');

    const id = await this.validateSession(token);
    if (id === null) throw new UnauthorizedException('Invalid session token');

    // attach validated user id to request for downstream handlers
    (req as any).userId = id;
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

  // returns the user id if session valid, otherwise null
  private validateSession(token: string): Promise<number | null> {
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
            if (parsed && parsed.valid === true) {
              const id = typeof parsed.id === 'number' ? parsed.id : null;
              resolve(id);
            } else {
              resolve(null);
            }
          } catch (e) {
            resolve(null);
          }
        });
      });
      req.on('error', () => resolve(null));
      req.end();
    });
  }
}
