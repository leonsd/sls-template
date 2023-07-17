import { ClientQueue } from './ClientQueue';
import { IConfirmationEmail } from '../interfaces/ConfirmationEmail';

export class ConfirmationEmailQueue {
  public static queueName = process.env.SEND_CONFIRMATION_EMAIL_QUEUE;

  constructor(private readonly clientQueue: ClientQueue) {}

  static getInstance() {
    const clientQueue = ClientQueue.getInstance(
      ConfirmationEmailQueue.queueName
    );

    return new ConfirmationEmailQueue(clientQueue);
  }

  enqueue = async (message: IConfirmationEmail) => {
    return await this.clientQueue.enqueue<IConfirmationEmail>(message);
  };
}
