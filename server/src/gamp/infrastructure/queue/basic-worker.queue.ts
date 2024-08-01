import { BullModule } from '@nestjs/bull';

export const BASIC_WORKER_QUEUE = '@basicWorker';

export type BasicWorkerQueueJobData = {
  currencyToTrack: string;
};

export const basicWorkerQueue = BullModule.registerQueue({
  name: BASIC_WORKER_QUEUE,
});
