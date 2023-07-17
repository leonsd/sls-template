import { HttpService } from './HttpService';

export class CountApiService {
  constructor(private readonly httpService: HttpService) {}

  static getInstance() {
    const baseURL = process.env.COUNT_API_BASE_URL;
    const httpService = new HttpService(baseURL);

    return new CountApiService(httpService);
  }

  incrementVisits = async (namespace: string, key: string) => {
    try {
      const uri = `/hit/${namespace}/${key}`;

      return await this.httpService.client.post(uri);
    } catch (error) {
      console.error('Error to increment visit', error.message);
      throw error;
    }
  };

  get = async (namespace: string, key: string) => {
    try {
      const uri = `/get/${namespace}/${key}`;

      return await this.httpService.client.get(uri);
    } catch (error) {
      console.error('Error to get visit count', error.message);
      throw error;
    }
  };
}
