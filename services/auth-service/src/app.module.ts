import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './presentation/auth.controller';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { CreateRoleUseCase } from './application/use-cases/create-role.use-case';
import { UserRepository } from './infrastructure/prisma/user.repository';
import { RoleRepository } from './infrastructure/prisma/role.repository';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService, LoginUseCase, CreateUserUseCase, CreateRoleUseCase, UserRepository, RoleRepository],
})
export class AppModule {}
