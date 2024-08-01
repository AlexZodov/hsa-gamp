import { HttpClient, RequestConfig, Response } from './http-client';
import { LoggerService } from '../logger';

export class LoggingHttpClientDecorator implements HttpClient {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly logger: LoggerService,
  ) {}

  async request<Result, Body = unknown>(
    config: RequestConfig<Body>,
  ): Promise<Response<Result>> {
    try {
      this.logger.info({ request: config }, 'http-request');
      const response = await this.httpClient.request<Result, Body>(config);
      this.logger.info({ request: config, response }, 'http-response');
      return response;
    } catch (error) {
      this.logger.error(
        {
          request: config,
          error,
        },
        'http-request-error',
      );
    }
  }
}
