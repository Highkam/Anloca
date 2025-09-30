import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CartRepositoryPort } from '../../../core/carts/domain/cart.repository.port';
import { Cart } from '../../../core/carts/domain/cart.entity';

@Injectable()
export class PrismaCartRepository implements CartRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(cart: Cart): Promise<Cart> {
    const created = await this.prisma.cart.create({
      data: {
        userId: cart.userId,
        state: cart.state,
      },
    });
    return new Cart(created.id, created.userId, created.createdAt, created.state);
  }

  async findById(idCart: number): Promise<Cart | null> {
    const found = await this.prisma.cart.findUnique({
      where: { id: idCart },
    });
    return found ? new Cart(found.id, found.userId, found.createdAt, found.state) : null;
  }

  async listByUser(userId: number): Promise<Cart[]> {
    const carts = await this.prisma.cart.findMany({
      where: { userId },
    });
    return carts.map(c => new Cart(c.id, c.userId, c.createdAt, c.state));
  }

  async delete(idCart: number): Promise<void> {
    await this.prisma.cart.delete({
      where: { id: idCart },
    });
  }
}
