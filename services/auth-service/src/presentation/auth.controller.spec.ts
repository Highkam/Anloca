import { AuthController } from './auth.controller';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { CreateRoleUseCase } from '../application/use-cases/create-role.use-case';

describe('AuthController', () => {
  let authController: AuthController;
  let loginUseCase: jest.Mocked<LoginUseCase>;
  let createUserUseCase: jest.Mocked<CreateUserUseCase>;
  let createRoleUseCase: jest.Mocked<CreateRoleUseCase>;

  beforeEach(() => {
    loginUseCase = { execute: jest.fn() } as any;
    createUserUseCase = { execute: jest.fn() } as any;
    createRoleUseCase = { execute: jest.fn() } as any;
    authController = new AuthController(loginUseCase, createUserUseCase, createRoleUseCase);
  });

  it('should call loginUseCase.execute with email and password and return controller response', async () => {
    const dto = { email: 'test@example.com', password: '123456' };

    // Resultado que devuelve el LoginUseCase (coincide con su tipo real)
    const useCaseResult = {
      id_user: 1,
      email: dto.email,
      name: 'Test User',
      sessionToken: 'token-abc-123',
    };

    // Respuesta que espera devolver el controlador (id y sessionToken)
    const expectedControllerResponse = { id: 1, sessionToken: 'token-abc-123' };

    // mockear con el objeto correcto
    loginUseCase.execute.mockResolvedValue(useCaseResult as any);

    const result = await authController.login(dto);

    expect(loginUseCase.execute).toHaveBeenCalledWith(dto.email, dto.password);
    expect(result).toEqual(expectedControllerResponse);
  });
});
