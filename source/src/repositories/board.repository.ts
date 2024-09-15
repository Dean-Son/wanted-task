import { CustomEntityRepository } from '@common/custom-typeorm/custom-typeorm.decorator';
import { TbBoard } from '@entities/board.entity';
import { ResponseBoardsPageDto } from '@modules/v1/boards/dtos/get-boards.dto';
import * as bcrypt from 'bcrypt';
import { QueryRunner, Repository } from 'typeorm';

@CustomEntityRepository(TbBoard)
export class BoardRepository extends Repository<TbBoard> {
  async getBoardList(searchWriter: string, searchTitle: string, take: number, skip: number): Promise<ResponseBoardsPageDto> {
    const queryBuilder = this.createQueryBuilder('board').where('is_delete=0');
    if (searchWriter) {
      queryBuilder.andWhere('writer = :searchWriter', { searchWriter: searchWriter });
    }

    if (searchTitle) {
      queryBuilder.andWhere('title LIKE :searchTitle', { searchTitle: `%${searchTitle}%` });
    }
    console.log(queryBuilder.skip(skip).take(take).getSql());
    const totalCount = await queryBuilder.skip(skip).take(take).getCount();
    const boardList = await queryBuilder.skip(skip).take(take).getMany();
    return {
      totalCount,
      boardList,
    };
  }

  async getOne(boardSeq: number): Promise<TbBoard> {
    return this.findOne({
      where: { isDelete: 0, boardSeq: boardSeq },
    });
  }

  /**
   * @brief 게시판 글을 저장한다.
   * @description
   * @author dean
   * @createdate 2024-09-15
   */
  async insertBoard(
    createData: Omit<TbBoard, 'boardSeq' | 'isDelete' | 'createDt' | 'updateDt'>,
    queryRunner: QueryRunner = this.queryRunner,
  ): Promise<TbBoard> {
    createData.passwd = await bcrypt.hash(createData.passwd, 10);
    return await queryRunner.manager.save(TbBoard, createData);
  }

  /**
   * @brief 게시판 글을 수정한다.
   * @description
   * @author dean
   * @createdate 2024-09-15
   */
  async updateBoard(
    updateData: Omit<TbBoard, 'isDelete' | 'createDt' | 'updateDt' | 'passwd'>,
    queryRunner: QueryRunner = this.queryRunner,
  ): Promise<void> {
    queryRunner.manager.update(TbBoard, { boardSeq: updateData.boardSeq }, { title: updateData.title, content: updateData.content });
  }

  /**
   * @brief 게시판 글을 저장한다.
   * @description
   * @author dean
   * @createdate 2024-09-15
   */
  async deleteBoard(boardSeq: number, queryRunner: QueryRunner = this.queryRunner): Promise<void> {
    queryRunner.manager.update(TbBoard, { boardSeq: boardSeq }, { isDelete: 1 });
  }
}
