import ForbiddenException from '../../src/exceptions/ForbiddenException';

describe('ForbiddenException', () => {
  test('expect throw ForbiddenException with default message', async () => {
    expect.assertions(2);

    try {
      throw new ForbiddenException();
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
      expect(error.message).toBe('Forbidden');
    }
  });

  test('expect throw ForbiddenException with the message passed as a parameter', async () => {
    expect.assertions(2);
    const message = 'any_error_message';

    try {
      throw new ForbiddenException(message);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
      expect(error.message).toBe(message);
    }
  });
});
