import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import * as process from 'process';

dotenvExpand.expand(config());

@Injectable()
export class ConfigService {
  appProject = 'hsa_gamp_service';
  server = {
    port: Number(process.env.PORT) || 3000,
  };

  redis = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  };

  currencyApi = {
    apiKey: process.env.CURRENCY_CONVERTER_API_KEY,
  };

  gamp = {
    apiSecret: process.env.GAMP_API_SECRET,
    measurementId: process.env.MEASUREMENT_ID,
  };

  isProduction() {
    return process.env.NODE_ENV === 'production';
  }
}
