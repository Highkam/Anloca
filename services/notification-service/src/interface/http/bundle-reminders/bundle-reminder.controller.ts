import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBadRequestResponse } from '@nestjs/swagger';
import { CreateBundleReminderUseCase } from '../../../core/bundle-reminders/application/usecases/create-bundle-reminder.usecase';
import { UpdateBundleReminderUseCase } from '../../../core/bundle-reminders/application/usecases/update-bundle-reminder.usecase';
import { DeleteBundleReminderUseCase } from '../../../core/bundle-reminders/application/usecases/delete-bundle-reminder.usecase';
import { GetBundleRemindersByUserUseCase } from '../../../core/bundle-reminders/application/usecases/get-bundle-reminders-by-user.usecase';
import { BundleReminderDto } from '../../../core/bundle-reminders/application/dto/bundle-reminder.dto';
import { CreateBundleReminderDto } from '../../../core/bundle-reminders/application/dto/create-bundle-reminder.dto';
import { UpdateBundleReminderDto } from '../../../core/bundle-reminders/application/dto/update-bundle-reminder.dto';
import { BundleReminderMapper } from '../../../core/bundle-reminders/application/mappers/bundle-reminder.mapper';

@ApiTags('Bundle Reminders')
@Controller('reminders')
export class BundleReminderController {
  constructor(
    private readonly createBundleReminder: CreateBundleReminderUseCase,
    private readonly updateBundleReminder: UpdateBundleReminderUseCase,
    private readonly deleteBundleReminder: DeleteBundleReminderUseCase,
    private readonly getBundleRemindersByUser: GetBundleRemindersByUserUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un recordatorio de bundle' })
  @ApiResponse({ status: 201, description: 'Recordatorio creado exitosamente', type: BundleReminderDto })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  async create(@Body() dto: CreateBundleReminderDto): Promise<BundleReminderDto> {
    const reminder = await this.createBundleReminder.execute(dto.userId, dto.bundleId, dto.frequencyDays);
    return BundleReminderMapper.toDto(reminder);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener recordatorios de un usuario' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, description: 'Lista de recordatorios', type: [BundleReminderDto] })
  async findByUser(@Param('userId', ParseIntPipe) userId: number): Promise<BundleReminderDto[]> {
    const reminders = await this.getBundleRemindersByUser.execute(userId);
    return reminders.map(r => BundleReminderMapper.toDto(r));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar frecuencia de un recordatorio' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Recordatorio actualizado', type: BundleReminderDto })
  @ApiResponse({ status: 404, description: 'Recordatorio no encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBundleReminderDto,
  ): Promise<BundleReminderDto> {
    if (!dto.frequencyDays) {
      throw new NotFoundException('frequencyDays is required');
    }
    const reminder = await this.updateBundleReminder.execute(id, dto.frequencyDays);
    return BundleReminderMapper.toDto(reminder);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un recordatorio' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Recordatorio eliminado' })
  @ApiResponse({ status: 404, description: 'Recordatorio no encontrado' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.deleteBundleReminder.execute(id);
    return { message: `Reminder con id ${id} eliminado` };
  }
}
