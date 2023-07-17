import BadRequestException from '../../src/exceptions/BadRequestException';

describe('BadRequestException', () => {
  test('expect throw BadRequestException with default message', async () => {
    expect.assertions(2);

    try {
      throw new BadRequestException();
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Invalid information');
    }
  });

  test('expect throw BadRequestException with the message passed as a parameter', async () => {
    expect.assertions(2);
    const message = 'any_error_message';

    try {
      throw new BadRequestException(message);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe(message);
    }
  });
});
