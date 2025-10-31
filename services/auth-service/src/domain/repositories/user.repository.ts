import { User } from '../user.entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: {
    name: string;
    email: string;
    password: string;
    role_id?: number;
  }): Promise<User>;
}
