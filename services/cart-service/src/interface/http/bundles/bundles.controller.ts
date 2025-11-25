import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateBundleDto, UpdateBundleDto } from '../../../core/bundles/application/dto/create-bundle.dto';
import { BundleMapper } from '../../../core/bundles/application/mappers/bundle.mapper';
import { CreateBundleUseCase } from '../../../core/bundles/application/usecases/create-bundle.usecase';
import { UpdateBundleUseCase } from '../../../core/bundles/application/usecases/update-bundle.usecase';
import { GetBundleUseCase } from '../../../core/bundles/application/usecases/get-bundle.usecase';
import { ListBundlesUseCase } from '../../../core/bundles/application/usecases/list-bundles.usecase';
import { DeleteBundleUseCase } from '../../../core/bundles/application/usecases/delete-bundle.usecase';

@ApiTags('bundles')
@Controller('bundles')
export class BundlesController {
  constructor(
    private readonly createUseCase: CreateBundleUseCase,
    private readonly updateUseCase: UpdateBundleUseCase,
    private readonly getUseCase: GetBundleUseCase,
    private readonly listUseCase: ListBundlesUseCase,
    private readonly deleteUseCase: DeleteBundleUseCase,
  ) {}

  @Post()
  @ApiBody({ schema: { example: { userId: 123, name: 'Monthly bundle', recurrenceId: 1 } } })
  @ApiResponse({ status: 201, description: 'Bundle created', type: (BundleMapper as any).toDto.constructor })
  async create(@Body() dto: CreateBundleDto) {
    const bundle = await this.createUseCase.execute({ userId: dto.userId, name: dto.name, recurrenceId: dto.recurrenceId });
    return BundleMapper.toDto(bundle);
  }

  @Put(':id')
  @ApiBody({ schema: { example: { name: 'Monthly bundle', recurrenceId: 1 } } })
  @ApiResponse({ status: 200, description: 'Bundle updated', type: (BundleMapper as any).toDto.constructor })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBundleDto) {
    const bundle = await this.updateUseCase.execute(id, { name: dto.name, recurrenceId: dto.recurrenceId });
    return BundleMapper.toDto(bundle);
  }

  @Get('all')
  @ApiResponse({ status: 200, description: 'List bundles', type: [(BundleMapper as any).toDto.constructor] })
  async list() {
    const bundles = await this.listUseCase.execute();
    return bundles.map(BundleMapper.toDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get bundle', type: (BundleMapper as any).toDto.constructor })
  async get(@Param('id', ParseIntPipe) id: number) {
    const bundle = await this.getUseCase.execute(id);
    return BundleMapper.toDto(bundle);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.deleteUseCase.execute(id);
    return { success: true };
  }
}
