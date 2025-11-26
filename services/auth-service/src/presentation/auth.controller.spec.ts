/**
 * Unit tests for AuthController
 *
 * This test suite validates the behavior of the AuthController class, ensuring that
 * its endpoints interact correctly with the corresponding use case classes. All dependencies
 * are mocked to isolate controller logic and verify input/output contract compliance.
 *
 * Dependencies mocked:
 * - LoginUseCase
 * - CreateUserUseCase
 * - CreateRoleUseCase
 * - ListRolesUseCase
 * - UpdateRoleUseCase
 * - DeleteRoleUseCase
 *
 * Each test should:
 * - Arrange: Prepare DTOs and mock return values
 * - Act: Call the controller method
 * - Assert: Verify correct use case invocation and response structure
 */
import { AuthController } from './auth.controller';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { CreateRoleUseCase } from '../application/use-cases/create-role.use-case';
import { ListRolesUseCase } from '../application/use-cases/list-roles.use-case';
import { UpdateRoleUseCase } from '../application/use-cases/update-role.use-case';
import { DeleteRoleUseCase } from '../application/use-cases/delete-role.use-case';
import { EventBusService } from 'src/infrastructure/eventBus.service';

describe('AuthController', () => {

  let authController: AuthController;
  let loginUseCase: jest.Mocked<LoginUseCase>;
  let createUserUseCase: jest.Mocked<CreateUserUseCase>;
  let createRoleUseCase: jest.Mocked<CreateRoleUseCase>;
  let listRolesUseCase: jest.Mocked<ListRolesUseCase>;
  let updateRoleUseCase: jest.Mocked<UpdateRoleUseCase>;
  let deleteRoleUseCase: jest.Mocked<DeleteRoleUseCase>;
  let eventBusMock: any;

  beforeEach(() => {

    loginUseCase = { execute: jest.fn() } as any;
    createUserUseCase = { execute: jest.fn() } as any;
    createRoleUseCase = { execute: jest.fn() } as any;
    listRolesUseCase = { execute: jest.fn() } as any;
    updateRoleUseCase = { execute: jest.fn() } as any;
    deleteRoleUseCase = { execute: jest.fn() } as any;
    eventBusMock = { publish: jest.fn() };
    authController = new AuthController(
      loginUseCase,
      eventBusMock,
      createUserUseCase,
      createRoleUseCase,
      listRolesUseCase,
      updateRoleUseCase,
      deleteRoleUseCase
    );
  });

  it('should call loginUseCase.execute with email and password and return controller response', async () => {
    /**
     * Test: Login endpoint
     *
     * Verifies that the controller calls LoginUseCase with correct parameters
     * and returns the expected response DTO.
     */
    const dto = { email: 'test@example.com', password: '123456' };


    // Result returned by LoginUseCase (matches its real type)
    const useCaseResult = {
      id_user: 1,
      email: dto.email,
      name: 'Test User',
      jwt: 'token-abc-123',
    };

    // Expected response returned by the controller (id and jwt)
    const expectedControllerResponse = { id: 1, jwt: 'token-abc-123' };

  
    loginUseCase.execute.mockResolvedValue(useCaseResult as any);

    const result = await authController.login(dto);

    expect(loginUseCase.execute).toHaveBeenCalledWith(dto.email, dto.password);
    expect(result).toEqual(expectedControllerResponse);
  });
});
