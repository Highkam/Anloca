import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './presentation/auth.controller';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { CreateRoleUseCase } from './application/use-cases/create-role.use-case';
import { UserRepository } from './infrastructure/prisma/user.repository';
import { RoleRepository } from './infrastructure/prisma/role.repository';
import { ListRolesUseCase } from './application/use-cases/list-roles.use-case';
import { UpdateRoleUseCase } from './application/use-cases/update-role.use-case';
import { DeleteRoleUseCase } from './application/use-cases/delete-role.use-case';
import { EventBusService } from './infrastructure/eventBus.service';
import { UsersModule } from './interface/http/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController, AuthController],
  providers: [AppService, LoginUseCase, CreateUserUseCase, CreateRoleUseCase, UserRepository, RoleRepository, ListRolesUseCase, UpdateRoleUseCase, DeleteRoleUseCase, EventBusService],
})
export class AppModule {}
