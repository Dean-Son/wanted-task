import { mysqlConnectionConfig } from '@configs/database-mysql.config';
import { BoardsModule } from '@modules/v1/boards/boards.module';
import { CommentsModule } from '@modules/v1/comments/comments.module';
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

    /* 비즈니스 모듈 */
    BoardsModule,
    CommentsModule,
  ],
})
export class CommonModule {}
