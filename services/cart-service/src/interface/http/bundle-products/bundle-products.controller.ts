import { Controller, Post, Body, Get, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateBundleProductDto } from '../../../core/bundle-products/application/dto/create-bundle-product.dto';
import { UpdateBundleProductDto } from '../../../core/bundle-products/application/dto/update-bundle-product.dto';
import { BundleProductMapper } from '../../../core/bundle-products/application/mappers/bundle-product.mapper';
import { BundleProductDto } from '../../../core/bundle-products/application/dto/bundle-product.dto';
import { CreateBundleProductUseCase } from '../../../core/bundle-products/application/usecases/create-bundle-product.usecase';
import { UpdateBundleProductUseCase } from '../../../core/bundle-products/application/usecases/update-bundle-product.usecase';
import { GetBundleProductUseCase } from '../../../core/bundle-products/application/usecases/get-bundle-product.usecase';
import { ListBundleProductsUseCase } from '../../../core/bundle-products/application/usecases/list-bundle-products.usecase';
import { DeleteBundleProductUseCase } from '../../../core/bundle-products/application/usecases/delete-bundle-product.usecase';

@ApiTags('bundle-products')
@Controller('bundle-products')
export class BundleProductsController {
  constructor(
    private readonly createUseCase: CreateBundleProductUseCase,
    private readonly updateUseCase: UpdateBundleProductUseCase,
    private readonly getUseCase: GetBundleProductUseCase,
    private readonly listUseCase: ListBundleProductsUseCase,
    private readonly deleteUseCase: DeleteBundleProductUseCase,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Created', type: BundleProductDto })
  @ApiBody({ schema: { example: { bundleId: 1, productId: 123, amount: 2 } } })
  async create(@Body() dto: CreateBundleProductDto): Promise<BundleProductDto> {
    const p: any = await this.createUseCase.execute({ bundleId: dto.bundleId, productId: dto.productId, amount: dto.amount });
    return BundleProductMapper.toDto(p);
  }

  @Get('all')
  @ApiResponse({ status: 200, description: 'List', type: [BundleProductDto] })
  async list(): Promise<BundleProductDto[]> {
    const list = await this.listUseCase.execute();
    return list.map(BundleProductMapper.toDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get', type: BundleProductDto })
  async get(@Param('id', ParseIntPipe) id: number): Promise<BundleProductDto> {
    const p = await this.getUseCase.execute(id);
    return BundleProductMapper.toDto(p);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Updated', type: BundleProductDto })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBundleProductDto): Promise<BundleProductDto> {
    const p = await this.updateUseCase.execute(id, { productId: dto.productId, amount: dto.amount });
    return BundleProductMapper.toDto(p);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Deleted' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteUseCase.execute(id);
  }
}