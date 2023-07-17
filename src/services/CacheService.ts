import { ICacheClient } from '../interfaces/CacheClient';
import { RedisCache } from './RedisCache';

export class CacheService {
  constructor(private readonly cacheClient: ICacheClient) {}

  static getInstance = () => {
    const redisClient = new RedisCache();
    return new CacheService(redisClient);
  };

  getClient = () => {
    return this.cacheClient;
  };
}
