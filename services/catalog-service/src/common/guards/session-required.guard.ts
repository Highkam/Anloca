import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class SessionRequiredGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'No JWT provided',
        error: 'Unauthorized',
      });
    }
    const token = authHeader.slice(7);
    try {
      const secret = process.env.JWT_SECRET || 'default_secret';
      const payload: any = jwt.verify(token, secret);
      request.userId = payload.id || payload.id_user || null;
      request.userRole = payload.role_id || null;
      return true;
    } catch (err) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid or expired token',
        error: 'Unauthorized',
      });
    }
  }
}
