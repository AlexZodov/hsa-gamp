import { Module } from '@nestjs/common';
import { GampServicesModule } from './services';
import { BasicWorkerConsumer } from './operation';
import { CurrencyApiModule } from '../common/currency-api/currency-api.module';

@Module({
  imports: [GampServicesModule, CurrencyApiModule],
  controllers: [],
  providers: [BasicWorkerConsumer],
})
export class GampModule {}
