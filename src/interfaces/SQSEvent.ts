import { SQSEvent, SQSRecord } from 'aws-lambda';

interface ISQSRecord<T = string> extends Omit<SQSRecord, 'body'> {
  body: T;
}

export interface ISQSEvent<T> extends Omit<SQSEvent, 'Records'> {
  Records: ISQSRecord<T>[];
}
