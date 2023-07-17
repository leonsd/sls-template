import NotFoundException from '../../src/exceptions/NotFoundException';

describe('NotFoundException', () => {
  test('expect throw NotFoundException with default message', async () => {
    expect.assertions(2);

    try {
      throw new NotFoundException();
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Resource not found');
    }
  });

  test('expect throw NotFoundException with the message passed as a parameter', async () => {
    expect.assertions(2);
    const message = 'any_error_message';

    try {
      throw new NotFoundException(message);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe(message);
    }
  });
});
