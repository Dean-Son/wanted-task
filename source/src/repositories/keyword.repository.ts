import { CustomEntityRepository } from '@common/custom-typeorm/custom-typeorm.decorator';
import { TbKeyword } from '@entities/keyword.entity';
import { Repository } from 'typeorm';

@CustomEntityRepository(TbKeyword)
export class KeywordRepository extends Repository<TbKeyword> {
  /**
   * @brief 키워드 전체를 불러온다.
   * @description
   * @author dean
   * @createdate 2024-09-16
   */
  async getAll(): Promise<TbKeyword[]> {
    return await this.find({});
  }
}
