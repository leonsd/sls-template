import { ClientQueue } from '../../src/queues/ClientQueue';
import { SQSClient, SQSClientConfig } from '@aws-sdk/client-sqs';

describe('ConfirmationEmailQueue', () => {
  const makeSut = () => {
    const queueURL = 'any_queue_url';
    const config: SQSClientConfig = { region: 'us-east-1' };
    const sqsClient = new SQSClient(config);
    const sut = new ClientQueue(sqsClient, queueURL);
    const message = { email: 'any_email@mail.com' };

    return { sut, sqsClient, queueURL, message };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('expect "getInstance" returns instance of ClientQueue', () => {
    const sut = ClientQueue.getInstance('');

    expect(sut).toBeInstanceOf(ClientQueue);
  });

  test('expect "enqueue" calls clientQueue.enqueue with correct params', async () => {
    const { sut, sqsClient, queueURL, message } = makeSut();
    sqsClient.send = jest.fn();
    const input = {
      MessageBody: JSON.stringify(message),
      QueueUrl: queueURL,
    };

    sqsClient.send = jest.fn();
    await sut.enqueue(message);

    expect(sqsClient.send).toHaveBeenCalledTimes(1);
    expect(sqsClient.send).toHaveBeenCalledWith(
      expect.objectContaining({ input })
    );
  });
});
