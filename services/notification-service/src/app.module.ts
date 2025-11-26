import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BundleRemindersModule } from './interface/http/bundle-reminders/bundle-reminders.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule, BundleRemindersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
