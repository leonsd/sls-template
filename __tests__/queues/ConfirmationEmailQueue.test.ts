import { ConfirmationEmailQueue } from '../../src/queues/ConfirmationEmailQueue';
import { ClientQueue } from '../../src/queues/ClientQueue';

jest.mock('../../src/queues/ClientQueue');

describe('ConfirmationEmailQueue', () => {
  const makeSut = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const clientQueue = new ClientQueue();
    const sut = new ConfirmationEmailQueue(clientQueue);
    const message = {
      email: 'any_email@mail.com',
    };

    return { sut, clientQueue, message };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('expect "getInstance" returns instance of ConfirmationEmailQueue', () => {
    const sut = ConfirmationEmailQueue.getInstance();

    expect(sut).toBeInstanceOf(ConfirmationEmailQueue);
  });

  test('expect "enqueue" calls clientQueue.enqueue with correct params', async () => {
    const { sut, clientQueue, message } = makeSut();
    clientQueue.enqueue = jest.fn();

    await sut.enqueue(message);

    expect(clientQueue.enqueue).toHaveBeenCalledTimes(1);
    expect(clientQueue.enqueue).toHaveBeenCalledWith(message);
  });
});
