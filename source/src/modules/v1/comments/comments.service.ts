import { ErrDesc } from '@common/constants/error.constants';
import { TransactionSupport } from '@common/helpers/orm.helper';
import { TbBoard } from '@entities/board.entity';
import { TbComment } from '@entities/comment.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BoardRepository } from '@repositories/board.repository';
import { CommentRepository } from '@repositories/comment.repository';
import { QueryRunner } from 'typeorm';
import { CommentsParser } from './comments.parser';
import { RequestGetCommentsDto, ResponseGetCommentsDto } from './dtos/get-comments.dto';
import { RequestSetCommentsDto, ResponseSetCommentsDto } from './dtos/set-comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly boardRepository: BoardRepository,
    private readonly transaction: TransactionSupport,
    private readonly commentParser: CommentsParser,
  ) {}

  /**
   * @brief 댓글 목록을 리턴한다
   * @description
   * @author dean
   * @createdate 2024-09-15
   */
  async getComments(boardSeq: number, requestDto: RequestGetCommentsDto): Promise<ResponseGetCommentsDto[]> {
    const comments = await this.commentRepository.getListWithBoard(boardSeq);
    console.log(requestDto);
    return this.commentParser.makeBoardList(comments);
  }

  /**
   * @brief 댓글을 작성한다
   * @description
   * @author dean
   * @createdate 2024-09-15
   */
  async setComment(boardSeq: number, requestDto: RequestSetCommentsDto): Promise<ResponseSetCommentsDto> {
    console.log(requestDto);
    const { writer, content, parentCommentSeq } = requestDto;
    const board = await this.boardRepository.getOne(boardSeq);

    await this.validateField(writer, content, boardSeq);
    await this.validate(board, parentCommentSeq);

    let comment: TbComment;
    await this.transaction.transact(async (queryRunner: QueryRunner) => {
      const newComment = new TbComment();
      newComment.content = content;
      newComment.writer = writer;
      newComment.parentCommentSeq = parentCommentSeq ? parentCommentSeq : 0;
      newComment.board = board; // ManyToOne 관계 설정

      const dbComment = await this.commentRepository.insertComment(newComment, queryRunner);

      comment = dbComment;
    });

    return this.commentParser.makeBoard(comment);
  }

  async validateField(writer: string, content: string, boardSeq: number) {
    if (!writer || !content || !boardSeq) {
      throw new BadRequestException(ErrDesc.BAD_REQUEST__WRONG_PARAMETER);
    }
  }

  async validate(board: TbBoard, parentCommentSeq: number) {
    if (!board) {
      throw new BadRequestException(ErrDesc.NOT_CONTENTS);
    }

    // 부모에 해당하는 댓글이 있는지 찾는다.
    if (parentCommentSeq) {
      const comment = await this.commentRepository.getOne(parentCommentSeq);
      if (!comment) {
        throw new BadRequestException(ErrDesc.NOT_CONTENTS);
      }
    }
  }
}
