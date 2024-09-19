import { CustomTypeOrmModule } from '@common/custom-typeorm/custom-typeorm.module';
import { DateHelper } from '@common/helpers/date.helper';
import { TransactionSupport } from '@common/helpers/orm.helper';
import { BullModule } from '@nestjs/bull';
import { Logger, Module } from '@nestjs/common';
import { KeywordRepository } from '@repositories/keyword.repository';
import { KeywordsConsumer } from './keywords.consumer';
import { KeywordLintener } from './keywords.listener';

@Module({
  imports: [
    CustomTypeOrmModule.forCustomRepository([KeywordRepository]),
    BullModule.registerQueue({
      name: 'keyword-noti',
    }),
  ],
  providers: [TransactionSupport, DateHelper, KeywordsConsumer, KeywordLintener, Logger],
  controllers: [],
})
export class keywordsModule {}
