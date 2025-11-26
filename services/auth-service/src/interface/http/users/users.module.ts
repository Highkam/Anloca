import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { GetUserEmailUseCase } from '../../../core/users/application/usecases/get-user-email.usecase';
import { UserRepository } from '../../../infrastructure/prisma/user.repository';

@Module({
  controllers: [UsersController],
  providers: [
    GetUserEmailUseCase,
    UserRepository,
  ],
})
export class UsersModule {}
