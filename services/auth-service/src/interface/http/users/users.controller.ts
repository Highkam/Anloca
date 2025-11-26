import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GetUserEmailUseCase } from '../../../core/users/application/usecases/get-user-email.usecase';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserEmail: GetUserEmailUseCase,
  ) {}

  @Get(':id/email')
  @ApiOperation({ summary: 'Obtener email de un usuario por ID (público)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  @ApiResponse({ 
    status: 200, 
    description: 'Email del usuario', 
    schema: { 
      example: { userId: 1, email: 'user@example.com' } 
    } 
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async getEmail(@Param('id', ParseIntPipe) id: number) {
    return this.getUserEmail.execute(id);
  }
}
