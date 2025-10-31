import { IUserRepository } from '../../domain/repositories/user.repository';

export class RegisterUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async registerUser(userData: {
        email: string;
        password: string;
        name: string;
        // agrega otros campos necesarios
    }) {
        // Aquí puedes agregar validaciones, hashing de contraseña, etc.
        // Ejemplo simple:
        const user = await this.userRepository.create(userData);
        return user;
    }
}