import { mysqlConnectionConfig } from '@configs/database-mysql.config';
import { redisConnectionConfig } from '@configs/database-redis.config';
import { BoardsModule } from '@modules/v1/boards/boards.module';
import { CommentsModule } from '@modules/v1/comments/comments.module';
import { keywordsModule } from '@modules/v1/keywords/keywords.module';
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

    /* 비즈니스 모듈 */
    BoardsModule,
    CommentsModule,
    keywordsModule,
  ],
})
export class CommonModule {}
