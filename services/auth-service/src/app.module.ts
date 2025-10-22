import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './presentation/auth.controller';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { UserRepository } from './infrastructure/prisma/user.repository';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService, LoginUseCase, UserRepository],
})
export class AppModule {}
