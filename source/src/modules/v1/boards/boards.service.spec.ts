import { setValueInJestProvide } from '@common/helpers/common.helper';
import { TransactionSupport } from '@common/helpers/orm.helper';
import { TbBoard } from '@entities/board.entity';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BoardRepository } from '@repositories/board.repository';
import { BoardParser } from './boards.parser';
import { BoardsService } from './boards.service';
import { RequestSetBoardsDto } from './dtos/set-boards.dto';

type MockBoardRepository = jest.Mocked<BoardRepository>;
type MockTransactionSupport = jest.Mocked<TransactionSupport>;

describe('BoardsService', () => {
  let boardsService: BoardsService;
  let boardRepository: MockBoardRepository;
  let keywordNotiQ: any;
  let boardParser: BoardParser;

  beforeEach(async () => {
    keywordNotiQ = {
      add: jest.fn(), // 큐에서 add 메서드만 목 처리
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardsService,
        {
          provide: BoardRepository,
          useValue: setValueInJestProvide(BoardRepository),
        },
        {
          provide: 'BullQueue_keyword-noti',
          useValue: keywordNotiQ, // BullQueue를 Mock 처리
        },
        {
          provide: TransactionSupport,
          useValue: setValueInJestProvide(TransactionSupport),
        },
        {
          provide: BoardParser,
          useValue: setValueInJestProvide(BoardParser),
        },
        {
          provide: Logger,
          useValue: setValueInJestProvide(Logger),
        },
      ],
    }).compile();

    boardsService = module.get<BoardsService>(BoardsService);
    boardRepository = module.get<MockBoardRepository>(BoardRepository);
    boardParser = module.get(BoardParser);
  });

  it('should be defined', () => {
    expect(boardsService).toBeDefined();
    expect(boardRepository).toBeDefined();
  });

  it('게시판 저장 테스트', async () => {
    const newBoard: RequestSetBoardsDto = {
      title: 'Test Title',
      content: 'Test Content',
      writer: 'writer',
      password: 'passwd',
    } as RequestSetBoardsDto;

    const savedBoard: TbBoard = {
      boardSeq: 1,
      title: 'Test Title',
      content: 'Test Content',
      writer: 'writer',
      passwd: 'passwd',
    } as TbBoard;

    const spyBoardRepositoryCall = jest.spyOn(boardParser, 'makeBoard').mockReturnValue(savedBoard);

    expect(spyBoardRepositoryCall).not.toBeCalled();

    const result = await boardsService.setBoards(newBoard);

    // 반환된 값이 기대한 값과 동일한지 확인
    expect(result).toEqual(savedBoard);
  });
});
