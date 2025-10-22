import { Body, Controller, Post, Get, Headers, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { LoginUseCase } from '../application/use-cases/login.use-case';

class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'mypassword123' })
  password: string;
}

class LoginResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'a1b2c3d4...' })
  sessionToken: string;
}

class LogoutResponseDto {
  @ApiProperty({ example: true })
  success: boolean;
}

class SessionStatusDto {
  @ApiProperty({ example: true })
  valid: boolean;

  @ApiProperty({ example: 1, required: false })
  id?: number | null;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @ApiResponse({ status: 200, description: 'Login result', type: LoginResponseDto })
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    const result: any = await this.loginUseCase.execute(dto.email, dto.password);
    const id = result?.id_user ?? result?.id ?? null;
    return { id, sessionToken: result.sessionToken };
  }

  @Post('logout')
  @ApiResponse({ status: 200, description: 'Logout result', type: LogoutResponseDto })
  async logout(
    @Body('token') tokenFromBody?: string,
    @Headers('x-session-token') tokenFromHeader?: string,
    @Headers('authorization') authorization?: string,
    @Query('token') tokenFromQuery?: string,
  ): Promise<LogoutResponseDto> {
    const token = tokenFromHeader ?? tokenFromBody ?? tokenFromQuery ?? (authorization?.startsWith('Bearer ') ? authorization.slice(7) : undefined);
    if (typeof (this.loginUseCase as any).logout === 'function') {
      const ok: boolean = await (this.loginUseCase as any).logout(token);
      return { success: !!ok };
    }
    return { success: false };
  }

  @Get('session')
  @ApiResponse({ status: 200, description: 'Session status', type: SessionStatusDto })
  async sessionStatus(
    @Headers('x-session-token') tokenFromHeader?: string,
    @Headers('authorization') authorization?: string,
    @Query('token') tokenFromQuery?: string,
  ): Promise<SessionStatusDto> {
    const token = tokenFromHeader ?? tokenFromQuery ?? (authorization?.startsWith('Bearer ') ? authorization.slice(7) : undefined);
    if (typeof (this.loginUseCase as any).validateSession === 'function') {
      const id = await (this.loginUseCase as any).validateSession(token);
      return { valid: id !== null, id };
    }
    return { valid: false, id: null };
  }
}
