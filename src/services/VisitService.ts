import { CacheService } from '../services/CacheService';

export class VisitService {
  constructor(private readonly cacheService: CacheService) {}

  static getInstance() {
    const cacheService = CacheService.getInstance();
    return new VisitService(cacheService);
  }

  increment = async (domain: string) => {
    const client = this.cacheService.getClient();

    try {
      await client.connect();
      const isFirstVisit = await this.isFirstVisit(domain);

      if (isFirstVisit) {
        const value = '0';
        await client.set(domain, value);
      }

      return await client.incrementBy(domain);
    } catch (error) {
      console.error('error', error);
      throw error;
    } finally {
      await client.close();
    }
  };

  get = async (domain: string) => {
    const client = this.cacheService.getClient();

    try {
      await client.connect();
      const response = await client.get(domain);

      if (!response) {
        return 0;
      }

      return Number(response);
    } catch (error) {
      console.error('error', error);
      throw error;
    } finally {
      await client.close();
    }
  };

  private isFirstVisit = async (domain: string) => {
    const client = this.cacheService.getClient();
    const response = await client.get(domain);
    const visits = Number(response);

    if (visits) {
      return false;
    }

    return true;
  };
}
