import ConflictException from '../../src/exceptions/ConflictException';

describe('ConflictException', () => {
  test('expect throw ConflictException with default message', async () => {
    expect.assertions(2);

    try {
      throw new ConflictException();
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message).toBe('There was a conflict on your request');
    }
  });

  test('expect throw ConflictException with the message passed as a parameter', async () => {
    expect.assertions(2);
    const message = 'any_error_message';

    try {
      throw new ConflictException(message);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message).toBe(message);
    }
  });
});
