import ConflictException from '../../src/exceptions/ConflictException';
import NotFoundException from '../../src/exceptions/NotFoundException';
import { UserRepository } from '../../src/repositories/UserRepository';
import { User } from '../../src/models/UserModel';
import { UserService } from '../../src/services/UserService';
import { ConfirmationEmailQueue } from '../../src/queues/ConfirmationEmailQueue';
import BadRequestException from '../../src/exceptions/BadRequestException';

jest.mock('../../src/repositories/UserRepository');
jest.mock('../../src/queues/ConfirmationEmailQueue');
const UserRepositoryMock = UserRepository as jest.MockedClass<
  typeof UserRepository
>;
const ConfirmationEmailQueueMock = ConfirmationEmailQueue as jest.MockedClass<
  typeof ConfirmationEmailQueue
>;

describe('UserService', () => {
  const makeSut = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userRepositoryMock = new UserRepositoryMock();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const confirmationEmailQueue = new ConfirmationEmailQueueMock();
    const sut = new UserService(userRepositoryMock, confirmationEmailQueue);
    const userDataMock = {
      name: 'any_name',
      email: 'any_email.com',
      password: 'any_password',
    };

    return { sut, userRepositoryMock, confirmationEmailQueue, userDataMock };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('expect "getInstance" returns instance of UserService', () => {
    const instance = UserService.getInstance();

    expect(instance).toBeInstanceOf(UserService);
  });

  test('expect "create" calls userRepository.create with correct params', async () => {
    const { sut, userRepositoryMock, confirmationEmailQueue, userDataMock } =
      makeSut();
    userRepositoryMock.create = jest.fn().mockImplementationOnce(() => {
      return userDataMock;
    });
    confirmationEmailQueue.enqueue = jest.fn();

    await sut.create(userDataMock);

    expect(userRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.create).toHaveBeenCalledWith(userDataMock);
  });

  test('expect "create" throw ConflictException if user email already exists', async () => {
    expect.assertions(2);
    const { sut, userRepositoryMock, userDataMock } = makeSut();

    try {
      userRepositoryMock.create = jest.fn().mockImplementationOnce(() => {
        throw {
          code: 'ER_DUP_ENTRY',
        };
      });

      await sut.create(userDataMock);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message).toBe('Email already registered');
    }
  });

  test('expect "create" throw any error', async () => {
    expect.assertions(2);
    const { sut, userRepositoryMock, userDataMock } = makeSut();

    try {
      userRepositoryMock.create = jest.fn().mockImplementationOnce(() => {
        throw new Error('any_error');
      });

      await sut.create(userDataMock);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('any_error');
    }
  });

  test('expect "show" calls userRepository.show with correct params', async () => {
    const { sut, userRepositoryMock } = makeSut();
    const id = 1;
    userRepositoryMock.show = jest.fn().mockImplementationOnce(() => {
      return {};
    });

    await sut.show(id);

    expect(userRepositoryMock.show).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.show).toHaveBeenCalledWith(id);
  });

  test('expect "show" throw NotFoundException if user not exists', async () => {
    expect.assertions(2);

    try {
      const { sut, userRepositoryMock } = makeSut();
      const id = 1;
      userRepositoryMock.show = jest.fn();

      await sut.show(id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('User not found');
    }
  });

  test('expect "confirmation" throw NotFoundException if user not exists', async () => {
    expect.assertions(2);

    try {
      const { sut, userDataMock, userRepositoryMock } = makeSut();
      userRepositoryMock.findByEmail = jest.fn();

      await sut.confirmation(userDataMock.email, '');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('User not found');
    }
  });

  test('expect "confirmation" throw ConflictException if user already confirmed', async () => {
    expect.assertions(2);

    try {
      const { sut, userDataMock, userRepositoryMock } = makeSut();
      userRepositoryMock.findByEmail = jest.fn().mockImplementationOnce(() => {
        const user = new User();
        user.isConfirmed = true;

        return user;
      });

      await sut.confirmation(userDataMock.email, '');
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message).toBe('Email already confirmed');
    }
  });

  test('expect "confirmation" throw BadRequestException if confirmation code is different', async () => {
    expect.assertions(2);

    try {
      const { sut, userDataMock, userRepositoryMock } = makeSut();
      userRepositoryMock.findByEmail = jest.fn().mockImplementationOnce(() => {
        const user = new User();
        user.confirmationCode = 'any_confirmation_code';

        return user;
      });

      await sut.confirmation(userDataMock.email, '');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Incorrect or invalid confirmation code');
    }
  });

  test('expect "confirmation" calls userRepository.updateByEmail with corect params', async () => {
    const { sut, userDataMock, userRepositoryMock } = makeSut();
    const confirmationCode = 'any_confirmation_code';
    userRepositoryMock.findByEmail = jest.fn().mockImplementationOnce(() => {
      const user = new User();
      user.email = userDataMock.email;
      user.confirmationCode = confirmationCode;

      return user;
    });
    userRepositoryMock.updateByEmail = jest.fn();

    await sut.confirmation(userDataMock.email, confirmationCode);

    expect(userRepositoryMock.updateByEmail).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.updateByEmail).toHaveBeenCalledWith(
      userDataMock.email,
      { isConfirmed: true }
    );
  });
});
