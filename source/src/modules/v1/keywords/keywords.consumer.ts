import { Process, Processor } from '@nestjs/bull';
import { Inject, Logger, LoggerService } from '@nestjs/common';
import { KeywordRepository } from '@repositories/keyword.repository';
import { Job } from 'bull';

@Processor('keyword-noti') // 등록한 큐를 보는 데코레이터
export class KeywordsConsumer {
  constructor(@Inject(Logger) private readonly logger: LoggerService, private readonly keywordRepository: KeywordRepository) {}

  @Process('board')
  async boardNoti(job: Job<string>) {
    // job.data로 작업 진행
    this.logger.log(job.data);
    this.notiSend(job.data);
  }

  @Process('comment')
  async commnetNoti(job: Job<string>) {
    // job.data로 작업 진행
    this.logger.log(job.data);
    this.notiSend(job.data);
  }

  /**
   * @brief 맵핑되는 키워드 유저들한테 알림전송
   * @description
   * @author dean
   * @createdate 2024-09-16
   */
  async notiSend(data: string) {
    const contentData = JSON.parse(data);
    const keywords = await this.keywordRepository.getAll();

    const matchingKeywords = keywords.filter((keyword) => contentData['content'].includes(keyword.keyword));

    this.logger.log(matchingKeywords);

    // 해당 유저들한테 알림전송
  }
}
