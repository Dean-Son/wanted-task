import { CustomTypeOrmModule } from '@common/custom-typeorm/custom-typeorm.module';
import { DateHelper } from '@common/helpers/date.helper';
import { TransactionSupport } from '@common/helpers/orm.helper';
import { BullModule } from '@nestjs/bull';
import { Logger, Module } from '@nestjs/common';
import { BoardRepository } from '@repositories/board.repository';
import { BoardsController } from './boards.controller';
import { BoardParser } from './boards.parser';
import { BoardsService } from './boards.service';

@Module({
  imports: [
    CustomTypeOrmModule.forCustomRepository([BoardRepository]),
    BullModule.registerQueue({
      name: 'keyword-noti',
    }),
  ],
  providers: [BoardsService, TransactionSupport, DateHelper, BoardParser, Logger],
  controllers: [BoardsController],
})
export class BoardsModule {}
