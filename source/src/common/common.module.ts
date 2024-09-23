import { mysqlConnectionConfig } from '@configs/database-mysql.config';
import { redisConnectionConfig } from '@configs/database-redis.config';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [],
  providers: [],
  imports: [
    /* MySQL */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      extraProviders: [],
      useFactory: mysqlConnectionConfig,
    }),

    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: redisConnectionConfig,
      inject: [ConfigService],
    }),
  ],
})
export class CommonModule {}
