import { RedisCache } from '../../src/services/RedisCache';
import { CacheService } from '../../src/services/CacheService';

describe('CacheService', () => {
  const makeSut = () => {
    const sut = CacheService.getInstance();

    return { sut };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('expect "getInstance" returns instance of CacheService', () => {
    const { sut } = makeSut();

    expect(sut).toBeInstanceOf(CacheService);
  });

  test('expect "getClient" returns instance of ICacheClient', () => {
    const { sut } = makeSut();
    const client = sut.getClient();

    expect(client).toBeInstanceOf(RedisCache);
  });
});
