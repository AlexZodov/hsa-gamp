import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AxiosHttpClient } from './axios.http-client';
import { HttpClient } from './http-client';
import { LoggingHttpClientDecorator } from './logging-http-client-decorator';
import { LoggerModule, LoggerService } from '../logger';

@Global()
@Module({
  imports: [HttpModule, LoggerModule],
  providers: [
    AxiosHttpClient,
    {
      provide: HttpClient,
      inject: [AxiosHttpClient, LoggerService],
      useFactory(httpClient: AxiosHttpClient, logger: LoggerService) {
        return new LoggingHttpClientDecorator(httpClient, logger);
      },
    },
  ],
  exports: [HttpClient],
})
export class HttpClientModule {}
