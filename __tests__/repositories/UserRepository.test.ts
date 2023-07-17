import { User } from '../../src/models/UserModel';
import { UserRepository } from '../../src/repositories/UserRepository';

jest.mock('../../src/models/UserModel');
const UserModelMock = User as jest.MockedClass<typeof User>;

describe('AuthService', () => {
  const makeSut = () => {
    const sut = new UserRepository(User);
    const userDataMock = {
      name: 'any_name',
      email: 'any_email.com',
      password: 'any_password',
    };

    return { sut, userDataMock };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('expect "getInstance" returns instance of UserRepository', () => {
    const instance = UserRepository.getInstance();

    expect(instance).toBeInstanceOf(UserRepository);
  });

  test('expect "create" calls user.save', async () => {
    const { sut, userDataMock } = makeSut();
    await sut.create(userDataMock);
    const [userModel] = UserModelMock.mock.instances;

    expect(userModel.save).toHaveBeenCalledTimes(1);
  });

  test('expect "show" calls this.model.findOneBy with correct params', async () => {
    const { sut } = makeSut();
    const id = 1;
    await sut.show(id);

    expect(UserModelMock.findOneBy).toHaveBeenCalledTimes(1);
    expect(UserModelMock.findOneBy).toHaveBeenCalledWith({ id });
  });

  test('expect "findConfirmedByEmail" calls this.model.findOne with correct params', async () => {
    const { sut, userDataMock } = makeSut();
    await sut.findConfirmedByEmail(userDataMock.email);

    expect(UserModelMock.findOne).toHaveBeenCalledTimes(1);
    expect(UserModelMock.findOne).toHaveBeenCalledWith({
      select: ['name', 'email', 'password', 'createdAt', 'updatedAt'],
      where: { email: userDataMock.email, isConfirmed: true },
    });
  });

  test('expect "findByEmail" calls this.model.findOne with correct params', async () => {
    const { sut, userDataMock } = makeSut();
    await sut.findByEmail(userDataMock.email);

    expect(UserModelMock.findOne).toHaveBeenCalledTimes(1);
    expect(UserModelMock.findOne).toHaveBeenCalledWith({
      select: [
        'name',
        'email',
        'password',
        'isConfirmed',
        'confirmationCode',
        'createdAt',
        'updatedAt',
      ],
      where: { email: userDataMock.email },
    });
  });

  test('expect "updateByEmail" calls this.model.update with correct params', async () => {
    const { sut, userDataMock } = makeSut();
    const data = { isConfirmed: true };
    await sut.updateByEmail(userDataMock.email, data);

    expect(UserModelMock.update).toHaveBeenCalledTimes(1);
    expect(UserModelMock.update).toHaveBeenCalledWith(
      { email: userDataMock.email },
      data
    );
  });
});
