import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure';
import { GampService } from './gamp.service';
import { HttpClientModule } from '../../common/http-client';
import { GampClientService } from './gamp-client.service';

@Module({
  imports: [InfrastructureModule, HttpClientModule],
  providers: [GampService, GampClientService],
  exports: [GampService, GampClientService],
})
export class GampServicesModule {}
