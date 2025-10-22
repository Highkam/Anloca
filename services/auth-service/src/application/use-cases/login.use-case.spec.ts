import { LoginUseCase } from './login.use-case';
import { UnauthorizedException } from '@nestjs/common';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let userRepoMock: any;

  beforeEach(() => {
    userRepoMock = {
      findByEmail: jest.fn(),
    };
    loginUseCase = new LoginUseCase(userRepoMock);
  });

  it('should return id_user, email, name and sessionToken if user exists and password is correct', async () => {
    const user = {
      id_user: 1,
      email: 'test@example.com',
      password: 'mypassword123', // plaintext accepted by current implementation
      name: 'Test User',
      register_date: new Date(),
      role_id: 1,
    };
    userRepoMock.findByEmail.mockResolvedValue(user);

    const result: any = await loginUseCase.execute('test@example.com', 'mypassword123');

    expect(result).toBeDefined();
    expect(result.id_user).toBe(1);
    expect(result.email).toBe('test@example.com');
    expect(result.name).toBe('Test User');
    expect(typeof result.sessionToken).toBe('string');
    expect(result.sessionToken.length).toBeGreaterThan(0);
  });

  it('should throw UnauthorizedException if user does not exist', async () => {
    userRepoMock.findByEmail.mockResolvedValue(null);

    await expect(
      loginUseCase.execute('noone@example.com', 'any'),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('should throw UnauthorizedException if password is wrong', async () => {
    const user = {
      id_user: 2,
      email: 'test2@example.com',
      password: 'correct-password',
      name: 'Another User',
      register_date: new Date(),
      role_id: 1,
    };
    userRepoMock.findByEmail.mockResolvedValue(user);

    await expect(
      loginUseCase.execute('test2@example.com', 'wrong-password'),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
