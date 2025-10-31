import { Body, Controller, Post, Get, Headers, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { CreateRoleUseCase } from '../application/use-cases/create-role.use-case';

class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'mypassword123' })
  password: string;
}

class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: 'mypassword123' })
  password: string;

  @ApiProperty({ example: 2, required: false, description: 'Role ID (defaults to 2 if not provided)' })
  role_id?: number;
}

class CreateRoleDto {
  @ApiProperty({ example: 'admin' })
  name: string;
}

class LoginResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'a1b2c3d4...' })
  sessionToken: string;
}

class CreateUserResponseDto {
  @ApiProperty({ example: 1 })
  id_user: number;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  register_date: Date;

  @ApiProperty({ example: 1 })
  role_id: number;
}

class CreateRoleResponseDto {
  @ApiProperty({ example: 1 })
  id_role: number;

  @ApiProperty({ example: 'admin' })
  name: string;
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
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly createRoleUseCase: CreateRoleUseCase,
  ) {}

  @Post('roles')
  @ApiResponse({ status: 201, description: 'Role created successfully', type: CreateRoleResponseDto })
  @ApiResponse({ status: 409, description: 'Role with this name already exists' })
  async createRole(@Body() dto: CreateRoleDto): Promise<CreateRoleResponseDto> {
    return await this.createRoleUseCase.execute({
      name: dto.name,
    });
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'User created successfully', type: CreateUserResponseDto })
  @ApiResponse({ status: 409, description: 'User with this email already exists' })
  async createUser(@Body() dto: CreateUserDto): Promise<CreateUserResponseDto> {
    return await this.createUserUseCase.execute({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role_id: dto.role_id ?? 2, // Default role_id = 2
    });
  }

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
