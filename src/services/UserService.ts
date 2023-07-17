import { UserRepository } from '../repositories/UserRepository';
import { IUserData } from '../interfaces/UserData';
import BadRequestException from '../exceptions/BadRequestException';
import ConflictException from '../exceptions/ConflictException';
import NotFoundException from '../exceptions/NotFoundException';
import { ConfirmationEmailQueue } from '../queues/ConfirmationEmailQueue';
import * as transform from '../transforms/user';

export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly confirmationEmailQueue: ConfirmationEmailQueue
  ) {}

  static getInstance() {
    const userRepository = UserRepository.getInstance();
    const confirmationEmailQueue = ConfirmationEmailQueue.getInstance();

    return new UserService(userRepository, confirmationEmailQueue);
  }

  create = async (data: IUserData) => {
    try {
      const created = await this.userRepository.create(data);
      await this.confirmationEmailQueue.enqueue({ email: created.email });

      return transform.output(created);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already registered');
      }

      throw error;
    }
  };

  show = async (id: number) => {
    const user = await this.userRepository.show(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return transform.output(user);
  };

  confirmation = async (email: string, code: string) => {
    const userEntity = await this.userRepository.findByEmail(email);

    if (!userEntity) {
      throw new NotFoundException('User not found');
    }

    const user = userEntity.toJSON();

    if (user.isConfirmed) {
      throw new ConflictException('Email already confirmed');
    }

    if (user.confirmationCode !== code) {
      throw new BadRequestException('Incorrect or invalid confirmation code');
    }

    await this.userRepository.updateByEmail(user.email, { isConfirmed: true });
  };
}
