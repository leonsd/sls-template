import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

export class HttpService {
  public client: AxiosInstance;

  constructor(baseURL: string, options?: CreateAxiosDefaults) {
    const FIVE_SECONDS = 5 * 1000;
    const defaultOptions: CreateAxiosDefaults = {
      ...options,
      timeout: FIVE_SECONDS,
    };

    this.client = axios.create({ baseURL, ...defaultOptions });
  }
}
