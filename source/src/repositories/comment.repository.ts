import { CustomEntityRepository } from '@common/custom-typeorm/custom-typeorm.decorator';
import { TbComment } from '@entities/comment.entity';
import { commentsPageType } from '@modules/v1/comments/comments.type';
import { QueryRunner, Repository } from 'typeorm';

@CustomEntityRepository(TbComment)
export class CommentRepository extends Repository<TbComment> {
  /**
   * @brief 댓글를 불러온다.
   * @description
   * @author dean
   * @createdate 2024-09-15
   */
  async getOne(commentSeq: number): Promise<TbComment> {
    return this.findOne({
      where: {
        commentSeq,
      },
    });
  }

  /**
   * @brief 댓글 리스트를 불러온다.
   * @description
   * @author dean
   * @createdate 2024-09-15
   */
  async getListWithBoard(boardSeq: number, take: number, skip: number): Promise<commentsPageType> {
    const [commentList, totalCount] = await this.findAndCount({
      relations: ['board'], // board_seq을 같이 내려줄려고 로드
      skip: skip, // 건너뛸 레코드 수
      take: take, // 가져올 레코드 수
      where: {
        board: {
          boardSeq,
        },
      },
    });

    return {
      totalCount,
      commentList,
    };
  }

  /**
   * @brief 댓글 저장한다.
   * @description
   * @author dean
   * @createdate 2024-09-15
   */
  async insertComment(createData: TbComment, queryRunner: QueryRunner = this.queryRunner): Promise<TbComment> {
    return await queryRunner.manager.save(TbComment, createData);
  }
}
