import { generateConfirmationCode } from '../../src/utils/number';

describe('Utils/Number', () => {
  test('expect "generateConfirmationCode" return a string with length 6', async () => {
    const code = generateConfirmationCode();

    expect(typeof code).toBe('string');
    expect(code.length).toBe(6);
  });
});
