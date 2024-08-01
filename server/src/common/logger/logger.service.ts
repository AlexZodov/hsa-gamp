import { PinoLogger, Params, PARAMS_PROVIDER_TOKEN } from 'nestjs-pino';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService extends PinoLogger {
  constructor(@Inject(PARAMS_PROVIDER_TOKEN) params: Params) {
    super(params);
  }
}
