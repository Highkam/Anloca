import { Controller, Post, Body, Put, Param, Get, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreatePeriodUseCase } from '../../../core/periods/application/usecases/create-period.usecase';
import { UpdatePeriodUseCase } from '../../../core/periods/application/usecases/update-period.usecase';
import { GetPeriodUseCase } from '../../../core/periods/application/usecases/get-period.usecase';
import { ListPeriodsUseCase } from '../../../core/periods/application/usecases/list-periods.usecase';
import { DeletePeriodUseCase } from '../../../core/periods/application/usecases/delete-period.usecase';
import { PeriodMapper } from '../../../core/periods/application/mappers/period.mapper';
import { CreatePeriodDto, UpdatePeriodDto } from '../../../core/periods/application/dto/create-period.dto';
import type { PeriodDto } from '../../../core/periods/application/dto/period.dto';
import { AdminRoleGuard } from '../../../common/guards/admin-role.guard';

@ApiTags('periods')
@Controller('periods')
export class PeriodsController {
  constructor(
    private readonly createUseCase: CreatePeriodUseCase,
    private readonly updateUseCase: UpdatePeriodUseCase,
    private readonly getUseCase: GetPeriodUseCase,
    private readonly listUseCase: ListPeriodsUseCase,
    private readonly deleteUseCase: DeletePeriodUseCase,
  ) {}

  @Post()
  @UseGuards(AdminRoleGuard)
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 201, description: 'Period created', type: (PeriodMapper as any).toDto.constructor })
  async create(@Body() dto: CreatePeriodDto): Promise<PeriodDto> {
    const p: any = await this.createUseCase.execute({ name: dto.name, durationDays: dto.durationDays });
    return PeriodMapper.toDto(p);
  }

  @Put(':id')
  @UseGuards(AdminRoleGuard)
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, description: 'Period updated', type: (PeriodMapper as any).toDto.constructor })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePeriodDto): Promise<PeriodDto> {
    const p = await this.updateUseCase.execute(id, { name: dto.name, durationDays: dto.durationDays });
    return PeriodMapper.toDto(p);
  }

  // List all must come before parameterized routes
  @Get('all')
  @UseGuards(AdminRoleGuard)
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, description: 'List periods', type: [(PeriodMapper as any).toDto.constructor] })
  async list(): Promise<PeriodDto[]> {
    const list = await this.listUseCase.execute();
    return list.map(PeriodMapper.toDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get period', type: (PeriodMapper as any).toDto.constructor })
  async get(@Param('id', ParseIntPipe) id: number): Promise<PeriodDto> {
    const p = await this.getUseCase.execute(id);
    return PeriodMapper.toDto(p);
  }

  @Delete(':id')
  @UseGuards(AdminRoleGuard)
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 204, description: 'Deleted' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteUseCase.execute(id);
  }
}
