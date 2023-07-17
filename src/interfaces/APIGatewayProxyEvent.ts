import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventPathParameters,
} from 'aws-lambda';

export interface IAPIGatewayProxyEvent<
  TB,
  TP = APIGatewayProxyEventPathParameters
> extends Omit<APIGatewayProxyEvent, 'body' | 'pathParameters'> {
  pathParameters: TP;
  body: TB;
}
