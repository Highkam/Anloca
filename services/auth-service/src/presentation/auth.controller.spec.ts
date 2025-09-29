import { AuthController } from './auth.controller';
import { LoginUseCase } from '../application/use-cases/login.use-case';

describe('AuthController', () => {
  let authController: AuthController;
  let loginUseCase: jest.Mocked<LoginUseCase>;

  beforeEach(() => {
    // 👇 create a plain mock object for LoginUseCase
    loginUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<LoginUseCase>;

    // 👇 inject the mock into the controller
    authController = new AuthController(loginUseCase);
  });

  it('should call loginUseCase.execute with email and password and return its result', async () => {
    const dto = { email: 'test@example.com', password: '123456' };
    const expected = { success: true, message: 'Login successful' };

    // mock the return value
    loginUseCase.execute.mockResolvedValue(expected);

    const result = await authController.login(dto);

    expect(loginUseCase.execute).toHaveBeenCalledWith(dto.email, dto.password);
    expect(result).toEqual(expected);
  });
});
