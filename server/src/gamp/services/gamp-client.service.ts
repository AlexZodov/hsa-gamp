import { Injectable } from '@nestjs/common';
import { HttpClient } from '../../common/http-client';
import { ConfigService } from '../../config';

@Injectable()
export class GampClientService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly configService: ConfigService,
  ) {}

  async sendCurrencyRateEvent(eventData: {
    currency: string;
    rate: number;
  }): Promise<void> {
    const apiSecret = this.configService.gamp.apiSecret;
    const measurementId = this.configService.gamp.measurementId;
    await this.httpClient.request({
      baseURL: 'https://www.google-analytics.com',
      url: '/mp/collect',
      method: 'POST',
      params: {
        api_secret: apiSecret,
        measurement_id: measurementId,
      },
      data: {
        client_id: 'xxx',
        events: [
          {
            name: 'currency_rate',
            params: eventData,
          },
        ],
      },
    });
  }
}
