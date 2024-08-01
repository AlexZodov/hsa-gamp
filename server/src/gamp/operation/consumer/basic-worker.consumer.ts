import { Process, Processor } from '@nestjs/bull';
import {
  BASIC_WORKER_QUEUE,
  BasicWorkerQueueJobData,
} from '../../infrastructure';
import { Job } from 'bull';
import { CurrencyApiService } from '../../../common/currency-api/currency-api.service';
import { GampClientService } from '../../services';
@Processor(BASIC_WORKER_QUEUE)
export class BasicWorkerConsumer {
  constructor(
    private readonly currencyApiService: CurrencyApiService,
    private readonly gampClientService: GampClientService,
  ) {}
  @Process()
  async process({
    data: { currencyToTrack },
  }: Job<BasicWorkerQueueJobData>): Promise<any> {
    console.log('Here', currencyToTrack);
    const rate = await this.currencyApiService
      .getCurrencyRate(currencyToTrack)
      .catch((e) => {
        console.log('Error curr api', e);
      });
    console.log('Rate to USD', currencyToTrack, rate);

    console.log('Sending rate to GAMP...');
    await this.gampClientService
      .sendCurrencyRateEvent({
        currency: currencyToTrack,
        rate: rate,
      })
      .catch((e) => {
        console.log('Error GAMP api', e);
      });
    console.log('Successfully sent rate to GAMP');
  }
}
