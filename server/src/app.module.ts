import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from './config';
import { GampModule } from './gamp/gamp.module';
import { BullModule } from '@nestjs/bull';
import { HttpClientModule } from './common/http-client';
import { LoggerModule } from './common/logger';

@Module({
  imports: [
    ConfigModule,
    GampModule,
    LoggerModule,
    HttpClientModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.redis.host,
          port: configService.redis.port,
        },
      }),
    }),
  ],
})
export class AppModule {}
