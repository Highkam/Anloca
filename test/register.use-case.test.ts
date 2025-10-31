import { RegisterUseCase } from '../services/auth-service/src/application/use-cases/register.use-case';
import { IUserRepository } from '../services/auth-service/src/domain/repositories/user.repository';
import { User } from '../services/auth-service/src/domain/user.entity';

// Mock del repositorio implementando la interfaz real
const mockUserRepository: IUserRepository = {
    async create(userData) {
        return new User(
            123, // id_user
            userData.name,
            userData.email,
            userData.password,
            new Date(), // register_date
            userData.role_id ?? 2 // role_id por defecto
        );
    },
    async findByEmail(email: string) {
        return null; 
    }
};

async function main() {
    const useCase = new RegisterUseCase(mockUserRepository);
    const newUser = await useCase.registerUser({
        email: 'test@example.com',
        password: 'securepassword',
        name: 'Test User',
    });
    console.log('Usuario registrado:', newUser);
}

main();
