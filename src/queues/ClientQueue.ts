import {
  SQSClient,
  SQSClientConfig,
  SendMessageCommand,
} from '@aws-sdk/client-sqs';

export class ClientQueue {
  constructor(
    private readonly clientQueue: SQSClient,
    private readonly queueUrl: string
  ) {}

  static getInstance(queueUrl: string) {
    const config: SQSClientConfig = {};
    const sqsClient = new SQSClient(config);

    return new ClientQueue(sqsClient, queueUrl);
  }

  enqueue = async <T>(message: T) => {
    const input = {
      MessageBody: JSON.stringify(message),
      QueueUrl: this.queueUrl,
    };
    const command = new SendMessageCommand(input);

    return await this.clientQueue.send(command);
  };
}
