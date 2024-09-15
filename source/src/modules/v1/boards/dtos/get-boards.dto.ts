import { PageOptionsDto } from '@common/dtos/page-options.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class RequestGetBoardsDto extends PageOptionsDto {
  @ApiProperty({
    description: '제목검색',
    example: '',
    required: false,
  })
  @IsOptional()
  searchTitle: string;

  @ApiProperty({
    description: '작성자 검색',
    example: '',
    required: false,
  })
  @IsOptional()
  searchWriter: string;
}

export class ResponseBoardsPageDto {
  @ApiProperty({
    name: 'totalCount',
    description: '총수',
    example: '',
  })
  totalCount: number;

  @ApiProperty({
    name: 'boardList',
    description: '게시판 리스트',
    example: '',
  })
  boardList: ResponseBoardsDto[];
}

export class ResponseBoardsDto {
  @ApiProperty({
    name: 'boardSeq',
    description: '게시글 seq',
    example: '',
  })
  boardSeq: number;

  @ApiProperty({
    name: 'writer',
    description: '작성자',
    example: '',
  })
  writer: string;

  @ApiProperty({
    name: 'title',
    description: '제목',
    example: '',
  })
  title: string;

  @ApiProperty({
    name: 'content',
    description: '내용',
    example: '',
  })
  content: string;

  @ApiProperty({
    name: 'createDt',
    description: '게시글 생성일',
    example: '2024-09-15 13:00:00',
  })
  createDt: string;

  @ApiProperty({
    name: 'updateDt',
    description: '게시글 수정일',
    example: '2024-09-15 13:00:00',
  })
  updateDt: string;
}
