import UnauthorizedException from '../../src/exceptions/UnauthorizedException';

describe('UnauthorizedException', () => {
  test('expect throw UnauthorizedException with default message', async () => {
    expect.assertions(2);

    try {
      throw new UnauthorizedException();
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.message).toBe('Unauthorized');
    }
  });

  test('expect throw UnauthorizedException with the message passed as a parameter', async () => {
    expect.assertions(2);
    const message = 'any_error_message';

    try {
      throw new UnauthorizedException(message);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.message).toBe(message);
    }
  });
});
