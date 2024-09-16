import { ConfigService } from '@nestjs/config';

export const redisConnectionConfig = (configService: ConfigService) => ({
  redis: {
    namespace: configService.get('REDIS_QUEUE_NAMESPACE'),
    host: configService.get('REDIS_QUEUE_HOST'),
    port: configService.get('REDIS_QUEUE_PORT'),
    db: configService.get('REDIS_QUEUE_DB'),
    connectTimeout: Number(configService.get('REDIS_QUEUE_CONNECT_TIMEOUT')),
    maxRetriesPerRequest: configService.get('REDIS_QUEUE_MAX_RETRIES_PER_REQUEST'), // all pending commands will be flushed with an error every 20 retry attempts
  },
});
