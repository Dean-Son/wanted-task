import { ErrDesc } from '@common/constants/error.constants';
import { TransactionSupport } from '@common/helpers/orm.helper';
import { TbBoard } from '@entities/board.entity';
import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { BoardRepository } from '@repositories/board.repository';
import * as bcrypt from 'bcrypt';
import { Queue } from 'bull';
import { QueryRunner } from 'typeorm';
import { BoardParser } from './boards.parser';
import { RequestDeleteBoardsDto, ResponseDeleteBoardsDto } from './dtos/delete-boards.dto';
import { RequestGetBoardsDto, ResponseBoardsDto, ResponseBoardsPageDto } from './dtos/get-boards.dto';
import { RequestPatchBoardsDto, ResponsePatchBoardsDto } from './dtos/patch-boards.dto';
import { RequestSetBoardsDto } from './dtos/set-boards.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectQueue('keyword-noti')
    private keywordNotiQ: Queue,
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly boardRepository: BoardRepository,
    private readonly transaction: TransactionSupport,
    private readonly boardParser: BoardParser,
  ) {}

  /**
   * @brief 게시판 목록을 리턴한다
   * @description
   * @author dean
   * @createdate 2024-09-15
   */
  async getBoards(requestDto: RequestGetBoardsDto): Promise<ResponseBoardsPageDto> {
    const { searchWriter, searchTitle, take, page } = requestDto;
    const skip = (page - 1) * take;

    const boardPage = await this.boardRepository.getBoardList(searchWriter, searchTitle, take, skip);

    return boardPage;
  }

  /**
   * @brief 게시판 글을 작성한다
   * @description
   * @author dean
   * @createdate 2024-09-15
   */
  async setBoards(requestDto: RequestSetBoardsDto): Promise<ResponseBoardsDto> {
    const { writer, title, content, password } = requestDto;

    await this.validateField(writer, title, content, password);

    let board: TbBoard;
    await this.transaction.transact(async (queryRunner: QueryRunner) => {
      const dbBoard = await this.boardRepository.insertBoard(
        {
          title,
          content,
          writer,
          passwd: password,
        },
        queryRunner,
      );

      board = dbBoard;
    });

    try {
      await this.keywordNotiQ.add(
        'board',
        JSON.stringify({ idx: board.boardSeq, content: content }),
        { removeOnComplete: true }, // 작업 저장 성공 시 작업 데이터 삭제
      );
    } catch (error) {
      this.logger.error(error);
    }

    return this.boardParser.makeBoard(board);
  }

  /**
   * @brief 게시판 수정한다
   * @description
   * @author dean
   * @createdate 2024-09-15
   */
  async patchBoard(boardSeq: number, requestDto: RequestPatchBoardsDto): Promise<ResponsePatchBoardsDto> {
    const { writer, title, content, password } = requestDto;

    await this.validateField(writer, title, content, password);

    let board = await this.boardRepository.getOne(boardSeq);
    await this.validate(board, writer, password);

    await this.transaction.transact(async (queryRunner: QueryRunner) => {
      await this.boardRepository.updateBoard(
        {
          boardSeq,
          title,
          content,
          writer,
        },
        queryRunner,
      );
    });
    board = await this.boardRepository.getOne(boardSeq);
    return this.boardParser.makeBoard(board);
  }

  /**
   * @brief 게시판 삭제한다.
   * @description
   * @author dean
   * @createdate 2024-09-15
   */
  async deleteBoards(boardSeq: number, requestDto: RequestDeleteBoardsDto): Promise<ResponseDeleteBoardsDto> {
    const { writer, password } = requestDto;

    const board = await this.boardRepository.getOne(boardSeq);
    await this.validate(board, writer, password);

    await this.transaction.transact(async (queryRunner: QueryRunner) => {
      await this.boardRepository.deleteBoard(boardSeq, queryRunner);
    });
    return {};
  }

  async validateField(writer: string, title: string, content: string, password: string) {
    if (!writer || !title || !content || !password) {
      throw new BadRequestException(ErrDesc.BAD_REQUEST__WRONG_PARAMETER);
    }
  }

  async validate(board: TbBoard, writer: string, password: string) {
    if (!board) {
      throw new BadRequestException(ErrDesc.NOT_CONTENTS);
    }

    // 작성자가 다르면 에러
    if (board.writer !== writer) {
      throw new BadRequestException(ErrDesc.NOT_BOARD_WRITER);
    }

    // 비밀번호가 다르면 에러
    const validatePassword = await bcrypt.compareSync(password, board.passwd);

    if (!validatePassword) {
      throw new BadRequestException(ErrDesc.NOT_BOARD_PASSWORD);
    }
  }
}
