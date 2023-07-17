import { createClient } from 'redis';
import { RedisCache } from '../../src/services/RedisCache';

jest.mock('redis');
const createClientMock = createClient as jest.MockedFunction<
  typeof createClient
>;
const client = {
  connect: jest.fn(),
  quit: jest.fn(),
  get: jest.fn(),
  set: jest.fn(),
  incrBy: jest.fn(),
} as any;
createClientMock.mockReturnValue(client);

describe('RedisCache', () => {
  const makeSut = () => {
    const sut = new RedisCache();

    return { sut, client };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('expect "connect" calls client.connect', async () => {
    const { sut, client } = makeSut();
    await sut.connect();

    expect(client.connect).toHaveBeenCalledTimes(1);
    expect(client.connect).toHaveBeenCalledWith();
  });

  test('expect "close" calls client.quit', async () => {
    const { sut, client } = makeSut();
    await sut.close();

    expect(client.quit).toHaveBeenCalledTimes(1);
    expect(client.quit).toHaveBeenCalledWith();
  });

  test('expect "get" calls client.get with correct params', async () => {
    const { sut, client } = makeSut();
    const key = 'any_key';
    await sut.get(key);

    expect(client.get).toHaveBeenCalledTimes(1);
    expect(client.get).toHaveBeenCalledWith(key);
  });

  test('expect "set" calls client.set with correct params', async () => {
    const { sut, client } = makeSut();
    const key = 'any_key';
    const value = 'any_value';
    await sut.set(key, value);

    expect(client.set).toHaveBeenCalledTimes(1);
    expect(client.set).toHaveBeenCalledWith(key, value);
  });

  test('expect "incrementBy" calls client.incrBy with correct params', async () => {
    const { sut, client } = makeSut();
    const key = 'any_key';
    const increment = 1;
    await sut.incrementBy(key);

    expect(client.incrBy).toHaveBeenCalledTimes(1);
    expect(client.incrBy).toHaveBeenCalledWith(key, increment);
  });
});
