import Exception from '../../src/exceptions/Exception';

describe('Exception', () => {
  const makeSut = () => {
    const statusCode = 200;
    const message = 'any_message';
    const sut = new Exception(statusCode, message);

    return { sut, statusCode, message };
  };

  test('expect "getStatusCode" return with correct statusCode', async () => {
    const { sut, statusCode } = makeSut();
    const status = sut.getStatusCode();

    expect(status).toBe(statusCode);
  });

  test('expect "getBody" return with correct message', async () => {
    const { sut, message } = makeSut();
    const body = sut.getBody();

    expect(body).toEqual({ message });
  });
});
