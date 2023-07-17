import { IConfirmationEmail } from '../interfaces/ConfirmationEmail';
import { ISQSEvent } from '../interfaces/SQSEvent';
import { SendConfirmationEmailService } from '../services/SendConfirmationEmailService';

export const sendConfirmationEmail = async (
  event: ISQSEvent<IConfirmationEmail>
) => {
  try {
    const sendConfirmationEmailService =
      SendConfirmationEmailService.getInstance();

    const promises = event.Records.map((record) => {
      const message = record.body;

      return sendConfirmationEmailService.start(message.email);
    });

    await Promise.all(promises);
  } catch (error) {
    console.error('Error to send confirmation mail');
    throw error;
  }
};
