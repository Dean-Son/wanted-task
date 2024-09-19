import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { KeywordsConsumer } from './keywords.consumer';

@Injectable()
export class KeywordLintener {
  constructor(private keywordsConsumer: KeywordsConsumer, @Inject(Logger) private readonly logger: LoggerService) {}
  @OnEvent('commentKeywordPush')
  handleCommentPushEvent(payload: any) {
    this.logger.log('사용자가 생성되었습니다:', payload);
    this.keywordsConsumer.notiSend(JSON.stringify(payload));
  }
}
