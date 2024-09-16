import { CustomTypeOrmModule } from '@common/custom-typeorm/custom-typeorm.module';
import { DateHelper } from '@common/helpers/date.helper';
import { TransactionSupport } from '@common/helpers/orm.helper';
import { BullModule } from '@nestjs/bull';
import { Logger, Module } from '@nestjs/common';
import { BoardRepository } from '@repositories/board.repository';
import { CommentRepository } from '@repositories/comment.repository';
import { CommentsController } from './comments.controller';
import { CommentsParser } from './comments.parser';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    CustomTypeOrmModule.forCustomRepository([CommentRepository, BoardRepository]),
    BullModule.registerQueue({
      name: 'keyword-noti',
    }),
  ],
  providers: [CommentsService, TransactionSupport, DateHelper, CommentsParser, Logger],
  controllers: [CommentsController],
})
export class CommentsModule {}
