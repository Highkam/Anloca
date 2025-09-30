import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBadRequestResponse } from '@nestjs/swagger';
import { CreateCartUseCase } from '../../../core/carts/application/usecases/create-cart.usecase';
import { GetCartUseCase } from '../../../core/carts/application/usecases/get-cart.usecase';
import { ListCartsUseCase } from '../../../core/carts/application/usecases/list-cart.usecase';
import { DeleteCartUseCase } from '../../../core/carts/application/usecases/delete-cart.usecase';
import { CartDto } from '../../../core/carts/application/dto/cart.dto';
import { CreateCartDto } from '../../../core/carts/application/dto/create-cart.dto';
import { CartMapper } from '../../../core/carts/application/mappers/cart.mapper';

@ApiTags('Carts')
@Controller('carts')
export class CartController {
  constructor(
    private readonly createCart: CreateCartUseCase,
    private readonly getCart: GetCartUseCase,
    private readonly listCarts: ListCartsUseCase,
    private readonly deleteCart: DeleteCartUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un carrito para un usuario' })
  @ApiResponse({ status: 201, description: 'Carrito creado exitosamente', type: CartDto })
  @ApiBadRequestResponse({ description: 'Datos inválidos al crear carrito' })
  async create(@Body() dto: CreateCartDto) {
    const cart = await this.createCart.execute(dto.userId);
    return CartMapper.toDto(cart);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un carrito por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Carrito encontrado', type: CartDto })
  @ApiResponse({ status: 404, description: 'Carrito no encontrado' })
  @ApiBadRequestResponse({ description: 'ID inválido' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    const cart = await this.getCart.execute(id);
    if (!cart) throw new NotFoundException(`Cart con id ${id} no encontrado`);
    return CartMapper.toDto(cart);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Listar todos los carritos de un usuario' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, description: 'Lista de carritos', type: [CartDto] })
  @ApiBadRequestResponse({ description: 'ID de usuario inválido' })
  async listByUser(@Param('userId', ParseIntPipe) userId: number) {
    const carts = await this.listCarts.execute(userId);
    return carts.map(c => CartMapper.toDto(c));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un carrito por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Carrito eliminado' })
  @ApiResponse({ status: 404, description: 'Carrito no encontrado' })
  @ApiBadRequestResponse({ description: 'ID inválido' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cart = await this.getCart.execute(id);
    if (!cart) throw new NotFoundException(`Cart con id ${id} no encontrado`);
    await this.deleteCart.execute(id);
    return { message: `Cart con id ${id} eliminado` };
  }
}
