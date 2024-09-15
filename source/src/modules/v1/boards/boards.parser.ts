import { DateHelper } from '@common/helpers/date.helper';
import { TbBoard } from '@entities/board.entity';
import { Injectable } from '@nestjs/common';
import { ResponseBoardsDto } from './dtos/get-boards.dto';

@Injectable()
export class BoardParser {
  constructor(private readonly dateHelper: DateHelper) {}

  makeBoard(board: TbBoard): ResponseBoardsDto {
    return {
      boardSeq: board.boardSeq,
      writer: board.writer,
      title: board.title,
      content: board.content,
      createDt: this.dateHelper.getFormatDate(board.createDt),
      updateDt: this.dateHelper.getFormatDate(board.updateDt),
    };
  }

  makeBoardList(boards: TbBoard[]): ResponseBoardsDto[] {
    return boards.map((board) => {
      const convertBoard = this.makeBoard(board);
      return convertBoard;
    });
  }
}
