import { User } from '../models/UserModel';
import { IUserData, IUserUpdateData } from '../interfaces/UserData';

export class UserRepository {
  constructor(private readonly model: typeof User) {}

  static getInstance() {
    return new UserRepository(User);
  }

  create = async (data: IUserData) => {
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;

    return user.save();
  };

  show = (id: number) => {
    return this.model.findOneBy({ id });
  };

  findConfirmedByEmail = (email: string) => {
    return this.model.findOne({
      select: ['name', 'email', 'password', 'createdAt', 'updatedAt'],
      where: { email, isConfirmed: true },
    });
  };

  findByEmail = (email: string) => {
    return this.model.findOne({
      select: [
        'name',
        'email',
        'password',
        'isConfirmed',
        'confirmationCode',
        'createdAt',
        'updatedAt',
      ],
      where: { email },
    });
  };

  updateByEmail = (email: string, data: IUserUpdateData) => {
    return this.model.update({ email }, data);
  };
}
