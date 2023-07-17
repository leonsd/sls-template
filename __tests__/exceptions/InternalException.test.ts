import InternalException from '../../src/exceptions/InternalException';

describe('InternalException', () => {
  test('expect throw InternalException with default message', async () => {
    expect.assertions(2);

    try {
      throw new InternalException();
    } catch (error) {
      expect(error).toBeInstanceOf(InternalException);
      expect(error.message).toBe('Internal server error');
    }
  });

  test('expect throw InternalException with the message passed as a parameter', async () => {
    expect.assertions(2);
    const message = 'any_error_message';

    try {
      throw new InternalException(message);
    } catch (error) {
      expect(error).toBeInstanceOf(InternalException);
      expect(error.message).toBe(message);
    }
  });
});
