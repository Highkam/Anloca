export interface User {
  id: number;
  email: string;
  password: string;
  name: string | null;
  roleId: number;
  createdAt: Date;
}

export interface UserRepositoryPort {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;
}
