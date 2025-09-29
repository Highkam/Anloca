import { UserRepository } from './user.repository';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: {
        findUnique: jest.fn(),
      },
    })),
  };
});

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let prismaMock: { user: { findUnique: jest.Mock } };

  beforeEach(() => {
    // We know that inside UserRepository it will do: new PrismaClient()
    // so we just grab the mocked implementation.
    const prismaInstance = new PrismaClient() as any;
    prismaMock = prismaInstance;
    userRepository = new UserRepository(); // 👈 no args now
    // @ts-ignore
    userRepository['prisma'] = prismaMock; // 👈 override its prisma property with our mock
  });

  it('✅ should find user by email', async () => {
    const mockUser = {
      id_user: 1,
      email: 'test@example.com',
      password: '123456',
      name: 'Test User',
      register_date: new Date(),
      role_id: 1,
    };

    prismaMock.user.findUnique.mockResolvedValue(mockUser);

    const user = await userRepository.findByEmail('test@example.com');

    expect(user).toEqual(expect.objectContaining({ email: 'test@example.com' }));
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    });
  });

  it('❌ should return null if user not found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const user = await userRepository.findByEmail('no@found.com');
    expect(user).toBeNull();
  });
});
