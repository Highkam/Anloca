import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './interface/http/carts/cart.module';
import { CartProductModule } from './interface/http/cart-products/cart-product.module';
import { PeriodsModule } from './interface/http/periods/periods.module';
import { SessionRequiredGuard } from './common/guards/session-required.guard';
import { BundlesModule } from './interface/http/bundles/bundles.module';

@Module({
  imports: [CartModule, CartProductModule, PeriodsModule, BundlesModule],
  controllers: [AppController],
  providers: [AppService, SessionRequiredGuard],
})
export class AppModule {}
