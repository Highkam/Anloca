import { Body, Controller, Get, Param, Post, ParseIntPipe, Delete, Req, UnauthorizedException, Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBadRequestResponse, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { CreateCartProductUseCase } from '../../../core/cart-products/application/usecases/create-cart-product.usecase';
import { ListCartProductsUseCase } from '../../../core/cart-products/application/usecases/list-cart-products.usecase';
import { DeleteCartProductUseCase } from '../../../core/cart-products/application/usecases/delete-cart-product.usecase';
import { CartProductDto } from '../../../core/cart-products/application/dto/cart-product.dto';
import { CreateCartProductDto } from '../../../core/cart-products/application/dto/create-cart-product.dto';
import { CartProductMapper } from '../../../core/cart-products/application/mappers/cart-product.mapper';
import { SessionRequiredGuard } from '../../../common/guards/session-required.guard';
import { CART_REPOSITORY } from '../../../core/carts/application/tokens';
import type { CartRepositoryPort } from '../../../core/carts/domain/cart.repository.port';

@ApiTags('CartProducts')
@Controller('cart-products')
export class CartProductController {
  constructor(
    private readonly createCartProduct: CreateCartProductUseCase,
    private readonly listCartProducts: ListCartProductsUseCase,
    private readonly deleteCartProduct: DeleteCartProductUseCase,
    @Inject(CART_REPOSITORY) private readonly cartRepository: CartRepositoryPort,
  ) {}

  @Post()
  @UseGuards(SessionRequiredGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Añadir un producto a un carrito' })
  @ApiResponse({ status: 201, description: 'Producto añadido', type: CartProductDto })
  @ApiBadRequestResponse({ description: 'Datos inválidos o carrito no existe' })
  async create(@Body() dto: CreateCartProductDto, @Req() req?: any) {
    const cartId = dto.cartId;
    const cart = await this.cartRepository.findById(cartId);
    if (!cart) throw new NotFoundException('Carrito no existe');

    const cartProduct = await this.createCartProduct.execute(dto.cartId, dto.productId, dto.amount);
    return CartProductMapper.toDto(cartProduct);
  }

  @Get('cart/:cartId')
  @UseGuards(SessionRequiredGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Listar productos de un carrito' })
  @ApiParam({ name: 'cartId', type: Number })
  @ApiResponse({ status: 200, description: 'Lista de productos del carrito', type: [CartProductDto] })
  async listByCart(@Param('cartId', ParseIntPipe) cartId: number, @Req() req?: any) {
    const cart = await this.cartRepository.findById(cartId);
    if (!cart) throw new NotFoundException('Carrito no existe');

    const cartProducts = await this.listCartProducts.execute(cartId);
    return cartProducts.map(cp => CartProductMapper.toDto(cp));
  }

  @Delete('cart/:cartId/product/:productId')
  @UseGuards(SessionRequiredGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Eliminar un producto de un carrito por cartId y productId' })
  @ApiParam({ name: 'cartId', type: Number })
  @ApiParam({ name: 'productId', type: Number })
  @ApiResponse({ status: 200, description: 'Producto eliminado del carrito', type: CartProductDto })
  async deleteByCartAndProduct(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Param('productId', ParseIntPipe) productId: number,
    @Req() req?: any,
  ) {
    const cart = await this.cartRepository.findById(cartId);
    if (!cart) throw new NotFoundException('Carrito no existe');

    const deleted = await this.deleteCartProduct.execute(cartId, productId);
    return CartProductMapper.toDto(deleted);
  }
}