import { Body, Controller, Post, Get, Headers, Query, Put, Param, BadRequestException, Delete, HttpCode, HttpStatus,UseGuards  } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { CreateRoleUseCase } from '../application/use-cases/create-role.use-case';
import { ListRolesUseCase } from '../application/use-cases/list-roles.use-case';
import { UpdateRoleUseCase } from '../application/use-cases/update-role.use-case';
import { DeleteRoleUseCase } from '../application/use-cases/delete-role.use-case';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

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

class UpdateRoleDto {
  @ApiProperty({ example: 'newname' })
  name: string;
}

class LoginResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  jwt: string;
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

class ValidateTokenDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  jwt: string;
}

class SessionStatusDto {
  @ApiProperty({ example: true })
  valid: boolean;

  @ApiProperty({ example: 1, required: false })
  id?: number | null;
}

class RoleItemDto {
  @ApiProperty({ example: 1 })
  id_role: number;

  @ApiProperty({ example: 'admin' })
  name: string;
}

@ApiTags('auth')
@ApiBearerAuth('access-token')
@Controller('auth')
export class AuthController {
    @Post('validate-token')
    @ApiResponse({ status: 200, description: 'Validate JWT', type: SessionStatusDto })
      async validateToken(@Body() body: ValidateTokenDto): Promise<SessionStatusDto> {
        const token = body?.jwt;
        if (typeof (this.loginUseCase as any).validateSession === 'function') {
          const id = await (this.loginUseCase as any).validateSession(token);
          return { valid: id !== null, id };
        }
        return { valid: false, id: null };
    }
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly listRolesUseCase: ListRolesUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
  ) {}

  @Post('create-role')
  @UseGuards(AdminRoleGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Role created successfully', type: CreateRoleResponseDto })
  @ApiResponse({ status: 409, description: 'Role with this name already exists' })
  async createRole(@Body() dto: CreateRoleDto): Promise<CreateRoleResponseDto> {
    return await this.createRoleUseCase.execute({
      name: dto.name,
    });
  }
  
  @Get('roles')
  @ApiResponse({ status: 200, description: 'List of roles', type: [RoleItemDto] })
  async listRoles(): Promise<RoleItemDto[]> {
    return await this.listRolesUseCase.execute();
  }

  @Put('roles/:id')
  @ApiResponse({ status: 200, description: 'Role updated', type: RoleItemDto })
  @ApiResponse({ status: 404, description: 'Role not found' })
  @ApiResponse({ status: 409, description: 'Another role with this name already exists' })
  async updateRole(@Param('id') idParam: string, @Body() dto: UpdateRoleDto): Promise<RoleItemDto> {
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) throw new BadRequestException('Invalid id');
    return await this.updateRoleUseCase.execute({ id_role: id, name: dto.name });
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'User created successfully', type: CreateUserResponseDto })
  @ApiResponse({ status: 409, description: 'User with this email already exists' })
  @ApiResponse({ status: 400, description: 'Invalid role_id: role does not exist' })
  async createUser(@Body() dto: CreateUserDto): Promise<CreateUserResponseDto> {
    try {
      return await this.createUserUseCase.execute({
        name: dto.name,
        email: dto.email,
        password: dto.password,
        role_id: dto.role_id ?? 2,
      });
    } catch (error: any) {
      if (error.code === 'P2003' && error.meta?.constraint === 'User_role_id_fkey') {
        // Error de clave foránea en role_id
        const { HttpException } = await import('@nestjs/common');
        throw new HttpException({
          statusCode: 400,
          message: 'Invalid role_id: role does not exist',
          error: 'Bad Request',
        }, 400);
      }
      throw error;
    }
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'Login result', type: LoginResponseDto })
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    const result: any = await this.loginUseCase.execute(dto.email, dto.password);
    const id = result?.id_user ?? result?.id ?? null;
    return { id, jwt: result.jwt };
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

  @Delete('roles/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Role deleted' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  async deleteRole(@Param('id') idParam: string): Promise<void> {
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) throw new BadRequestException('Invalid id');
    await this.deleteRoleUseCase.execute(id);
  }

}