import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { BASIC_WORKER_QUEUE, BasicWorkerQueueJobData } from '../infrastructure';
import { Queue } from 'bull';
@Injectable()
export class GampService implements OnModuleInit {
  constructor(
    @InjectQueue(BASIC_WORKER_QUEUE)
    private readonly queue: Queue<BasicWorkerQueueJobData>,
  ) {}

  async start(): Promise<any> {
    await this.queue
      .add(
        {
          currencyToTrack: 'CAD',
        },
        {
          repeat: {
            every: 10000,
          },
        },
      )
      .catch((e) => {
        console.log('Error', e);
      });
  }

  async onModuleInit(): Promise<any> {
    console.log('Starting worker...');
    await this.start().catch((e) => {
      console.log('Error', e);
    });
    console.log('Started worker');
  }
}
