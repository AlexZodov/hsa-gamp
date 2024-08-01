import { Global, Injectable } from '@nestjs/common';
import { HttpClient } from '../http-client';
import { ConfigService } from '../../config';
@Global()
@Injectable()
export class CurrencyApiService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly configService: ConfigService,
  ) {}

  async getCurrencyRate(currencyToTrack: string): Promise<any> {
    const result = <{ data: Record<any, any> }>await this.httpClient.request({
      method: 'GET',
      baseURL: 'https://api.freecurrencyapi.com',
      url:
        'v1/latest?apikey=' +
        this.configService.currencyApi.apiKey +
        '&currencies=USD,' +
        currencyToTrack,
    });

    return result.data?.data[currencyToTrack];
  }
}
