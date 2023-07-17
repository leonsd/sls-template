import { hashSync } from 'bcrypt';

import UnauthorizedException from '../../src/exceptions/UnauthorizedException';
import { User } from '../../src/models/UserModel';
import { UserRepository } from '../../src/repositories/UserRepository';
import { AuthService } from '../../src/services/AuthService';

jest.mock('../../src/repositories/UserRepository');
const UserRepositoryMock = UserRepository as jest.MockedClass<
  typeof UserRepository
>;

describe('AuthService', () => {
  const makeSut = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userRepositoryMock = new UserRepositoryMock();
    const sut = new AuthService(userRepositoryMock);
    const authData = {
      email: 'any_email.com',
      password: 'any_password',
    };

    return { sut, userRepositoryMock, authData };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('expect "getInstance" returns instance of AuthService', () => {
    const instance = AuthService.getInstance();

    expect(instance).toBeInstanceOf(AuthService);
  });

  test('expect "authentication" throw UnauthorizedException if user not found', async () => {
    expect.assertions(1);

    try {
      const { sut, userRepositoryMock, authData } = makeSut();
      userRepositoryMock.findConfirmedByEmail = jest.fn();

      await sut.authentication(authData);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });

  test('expect "authentication" throw UnauthorizedException if user password not match', async () => {
    expect.assertions(1);

    try {
      const { sut, userRepositoryMock, authData } = makeSut();
      userRepositoryMock.findConfirmedByEmail = jest
        .fn()
        .mockImplementationOnce(() => {
          const salt = 10;
          const user = new User();
          user.email = 'any_email.com';
          user.password = hashSync('any_password_2', salt);

          return user;
        });

      await sut.authentication(authData);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });

  test('expect "authentication" return token', async () => {
    const { sut, userRepositoryMock, authData } = makeSut();
    userRepositoryMock.findConfirmedByEmail = jest
      .fn()
      .mockImplementationOnce(() => {
        const user = new User();
        const salt = 10;
        user.name = 'any_name';
        user.email = 'any_email.com';
        user.password = hashSync(authData.password, salt);

        return user;
      });

    const token = await sut.authentication(authData);
    expect(typeof token).toBe('string');
  });
});
