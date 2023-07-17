import { EmailService } from './EmailService';
import NotFoundException from '../exceptions/NotFoundException';
import { UserRepository } from '../repositories/UserRepository';

export class SendConfirmationEmailService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService
  ) {}

  static getInstance() {
    const userRepository = UserRepository.getInstance();
    const emailService = EmailService.getInstance();

    return new SendConfirmationEmailService(userRepository, emailService);
  }

  start = async (email: string) => {
    const userEntity = await this.userRepository.findByEmail(email);

    if (!userEntity) {
      throw new NotFoundException('User not found');
    }

    const user = userEntity.toJSON();
    return await this.send(user.email, user.confirmationCode);
  };

  private send = async (email: string, confirmationCode: string) => {
    try {
      const to = email;
      const subject = 'Confirm your Account';
      const body = `Your confirmation code is: ${confirmationCode}`;

      await this.emailService.send(to, subject, body);
    } catch (error) {
      console.error('Error to send confirmation mail', error);

      throw error;
    }
  };
}
