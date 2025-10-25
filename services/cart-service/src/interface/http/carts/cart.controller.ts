import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe, NotFoundException, UnauthorizedException, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBadRequestResponse } from '@nestjs/swagger';
import { CreateCartUseCase } from '../../../core/carts/application/usecases/create-cart.usecase';
import { GetCartUseCase } from '../../../core/carts/application/usecases/get-cart.usecase';
import { ListCartsUseCase, ListAllCartsUseCase } from '../../../core/carts/application/usecases/list-cart.usecase';
import { DeleteCartUseCase } from '../../../core/carts/application/usecases/delete-cart.usecase';
import { CartDto } from '../../../core/carts/application/dto/cart.dto';
import { CreateCartDto } from '../../../core/carts/application/dto/create-cart.dto';
import { CartMapper } from '../../../core/carts/application/mappers/cart.mapper';
import { sessionRequired } from '../../../common/decorators/session-required.decorator';

@ApiTags('Carts')
@Controller('carts')
export class CartController {
  constructor(
    private readonly createCart: CreateCartUseCase,
    private readonly getCart: GetCartUseCase,
    private readonly listCarts: ListCartsUseCase,
    private readonly listAllCarts: ListAllCartsUseCase,
    private readonly deleteCart: DeleteCartUseCase,
  ) {}

  @Post()
  @sessionRequired()
  @ApiOperation({ summary: 'Crear un carrito para un usuario' })
  @ApiResponse({ status: 201, description: 'Carrito creado exitosamente', type: CartDto })
  @ApiBadRequestResponse({ description: 'Datos inválidos al crear carrito' })
  async create(@Body() dto: CreateCartDto, @Req() req?: any) {
    const validatedUserId = req?.userId ?? null;
    if (validatedUserId !== null && dto.userId !== validatedUserId) {
      throw new UnauthorizedException('User id does not match session user');
    }

    const cart = await this.createCart.execute(dto.userId);
    return CartMapper.toDto(cart);
  }

  @Get('all')
  @ApiOperation({ summary: 'Listar todos los carritos' })
  @ApiResponse({ status: 200, description: 'Lista de todos los carritos', type: [CartDto] })
  async listAll() {
    const carts = await this.listAllCarts.execute();
    return carts.map(c => CartMapper.toDto(c));
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
  @sessionRequired()
  @ApiOperation({ summary: 'Eliminar un carrito por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Carrito eliminado' })
  @ApiResponse({ status: 404, description: 'Carrito no encontrado' })
  @ApiBadRequestResponse({ description: 'ID inválido' })
  async delete(@Param('id', ParseIntPipe) id: number, @Req() req?: any) {
    const cart = await this.getCart.execute(id);
    if (!cart) throw new NotFoundException(`Cart con id ${id} no encontrado`);

    const validatedUserId = req?.userId ?? null;
    if (validatedUserId !== null && cart.userId !== validatedUserId) {
      throw new UnauthorizedException('No tienes permiso para eliminar este carrito');
    }

    await this.deleteCart.execute(id);
    return { message: `Cart con id ${id} eliminado` };
  }
}
