import { Global, Module } from '@nestjs/common';
import { CurrencyApiService } from './currency-api.service';

@Global()
@Module({
  providers: [CurrencyApiService],
  exports: [CurrencyApiService],
})
export class CurrencyApiModule {}
