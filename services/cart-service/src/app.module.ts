import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './interface/http/carts/cart.module';
import { CartProductModule } from './interface/http/cart-products/cart-product.module';

@Module({
  imports: [CartModule, CartProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
