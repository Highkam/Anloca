import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { UserRepository } from './infrastructure/prisma/user.repository';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  // Nuevo: tests de integración DB <-> LoginUseCase (solo si INTEGRATION_TEST=true)
  const runIntegration = process.env.INTEGRATION_TEST === 'true';
  const integrationDescribe = runIntegration ? describe : describe.skip;

  integrationDescribe('Integration: Prisma <-> LoginUseCase', () => {
    jest.setTimeout(20000);
    let prisma: PrismaClient;
    let userRepo: UserRepository;
    let loginUseCase: LoginUseCase;
    const testEmail = 'integration_test@example.com';
    const testPlain = 'Int3grationPass!';

    beforeAll(async () => {
      prisma = new PrismaClient();
      await prisma.$connect();

      userRepo = new UserRepository(prisma as any);
      loginUseCase = new LoginUseCase(userRepo as any);

      const hashed = await bcrypt.hash(testPlain, 10);
      // Upsert usuario de prueba (asegura existencia)
      await prisma.user.upsert({
        where: { email: testEmail },
        update: {
          password: hashed,
          name: 'Integration Test',
        },
        create: {
          email: testEmail,
          password: hashed,
          name: 'Integration Test',
          register_date: new Date(),
          role_id: 1,
        },
      });
    });

    afterAll(async () => {
      try {
        await prisma.user.deleteMany({ where: { email: testEmail } });
      } catch (e) {
        // ignore
      }
      await prisma.$disconnect();
    });

    it('✅ should login, return id and sessionToken, validate and logout', async () => {
      const result: any = await loginUseCase.execute(testEmail, testPlain);
      expect(result).toBeDefined();
      expect(result.id_user ?? result.id).toBeDefined();
      expect(result.sessionToken).toBeDefined();

      const idFromSession = await loginUseCase.validateSession(result.sessionToken);
      expect(idFromSession).toBe(result.id_user ?? result.id);

      const logoutOk = await loginUseCase.logout(result.sessionToken);
      // logout returns boolean (true if existed)
      expect(!!logoutOk).toBe(true);

      const afterLogout = await loginUseCase.validateSession(result.sessionToken);
      expect(afterLogout).toBeNull();
    });
  });
});
