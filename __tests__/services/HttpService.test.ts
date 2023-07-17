import axios from 'axios';
import { HttpService } from '../../src/services/HttpService';

jest.mock('axios');
const AxiosMock = axios as jest.Mocked<typeof axios>;

describe('HttpService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('expect "this.client" has AxiosInstance', () => {
    const baseURL = 'any_base_url';
    new HttpService(baseURL);

    expect(AxiosMock.create).toHaveBeenCalledTimes(1);
    expect(AxiosMock.create).toHaveBeenCalledWith(
      expect.objectContaining({ baseURL })
    );
  });
});
