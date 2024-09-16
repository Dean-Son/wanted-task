import { DateHelper } from '@common/helpers/date.helper';
import { TbComment } from '@entities/comment.entity';
import { Injectable } from '@nestjs/common';
import { commentsPageType } from './comments.type';
import { ResponseCommentsPageDto, ResponseGetCommentsDto } from './dtos/get-comments.dto';

@Injectable()
export class CommentsParser {
  constructor(private readonly dateHelper: DateHelper) {}

  makeBoard(comment: TbComment): ResponseGetCommentsDto {
    return {
      boardSeq: comment.board.boardSeq,
      commentSeq: comment.commentSeq,
      parentCommentSeq: comment.parentCommentSeq,
      writer: comment.writer,
      content: comment.content,
      createDt: this.dateHelper.getFormatDate(comment.createDt),
    };
  }

  makeBoardList(comments: commentsPageType): ResponseCommentsPageDto {
    return {
      totalCount: comments.totalCount,
      commentList: comments.commentList.map((comment) => {
        const convertComment = this.makeBoard(comment);
        return convertComment;
      }),
    };
  }
}
