import { Module } from '@nestjs/common';
import { basicWorkerQueue } from './queue';

@Module({
  imports: [basicWorkerQueue],
  providers: [],
  exports: [basicWorkerQueue],
})
export class InfrastructureModule {}
