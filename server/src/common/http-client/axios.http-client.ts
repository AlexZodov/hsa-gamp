import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpClient, RequestConfig, Response } from './http-client';

@Injectable()
export class AxiosHttpClient implements HttpClient {
  constructor(private readonly http: HttpService) {}

  async request<Result, Data = unknown>(
    config: RequestConfig<Data>,
  ): Promise<Response<Result>> {
    const response = await firstValueFrom(
      this.http.request(config).pipe(
        catchError((error) => {
          if (error.response && error.response.status) {
            throw new HttpException(error.response, error.response.status, {
              cause: error,
            });
          } else {
            throw error;
          }
        }),
      ),
    );
    return {
      status: response.status,
      headers: response.headers as Response<Data>['headers'],
      data: response.data,
    };
  }
}
