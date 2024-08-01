import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { LoggerService } from './logger.service';
import { ConfigModule, ConfigService } from '../../config';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          level: 'debug',
          name: configService.appProject,
        },
      }),
    }),
  ],
})
export class LoggerModule {}
