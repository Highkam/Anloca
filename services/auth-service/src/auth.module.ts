import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './application/auth.service';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { UserRepository } from './infrastructure/prisma/user.repository'; // tu implementación concreta
import { IUserRepository } from './domain/repositories/user.repository';

export const USER_REPOSITORY = 'USER_REPOSITORY'; // define el token

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LoginUseCase,
    RegisterUseCase,
    {
      provide: USER_REPOSITORY, // usa el token string
      useClass: UserRepository,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
