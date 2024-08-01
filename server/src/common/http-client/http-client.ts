export type RequestConfig<Body> = {
  requestId?: string;
  baseURL: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: Record<string, any>;
  body?: Body;
  timeout?: number;
};

export type Response<Body> = {
  status: number;
  headers: Record<string, string[] | string | number | boolean | null>;
  data: Body;
};

export abstract class HttpClient {
  abstract request<Result, Body = unknown>(
    config: RequestConfig<Body>,
  ): Promise<Response<Result>>;
}
