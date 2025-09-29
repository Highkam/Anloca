import { LoginUseCase } from './login.use-case';
import { UserRepository } from 'src/infrastructure/prisma/user.repository';
import * as bcrypt from 'bcrypt';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    loginUseCase = new LoginUseCase(mockUserRepository);
  });

  it('should return success if user exists and password is correct', async () => {
    const hash = await bcrypt.hash('mypassword123', 10);
    mockUserRepository.findByEmail.mockResolvedValue({
      id_user: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: hash,
      register_date: new Date(),
      role_id: 1,
    });

    const result = await loginUseCase.execute('test@example.com', 'mypassword123');

    expect(result).toEqual({
      success: true,
      message: 'Login successful',
    });
  });

  it('should return user not found if user does not exist', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    const result = await loginUseCase.execute('no@found.com', '123456');

    expect(result).toEqual({
      success: false,
      message: 'User not found',
    });
  });

  it('should return invalid password if password is wrong', async () => {
    const hash = await bcrypt.hash('mypassword123', 10);
    mockUserRepository.findByEmail.mockResolvedValue({
      id_user: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: hash,
      register_date: new Date(),
      role_id: 1,
    });

    const result = await loginUseCase.execute('test@example.com', 'wrongPassword');

    expect(result).toEqual({
      success: false,
      message: 'Invalid password',
    });
  });
});
