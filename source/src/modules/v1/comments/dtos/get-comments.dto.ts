import { PageOptionsDto } from '@common/dtos/page-options.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RequestGetCommentsDto extends PageOptionsDto {}

export class ResponseCommentsPageDto {
  @ApiProperty({
    name: 'totalCount',
    description: '총수',
    example: '',
  })
  totalCount: number;

  @ApiProperty({
    name: 'boardList',
    description: '댓글 리스트',
    example: '',
  })
  commentList: ResponseGetCommentsDto[];
}

export class ResponseGetCommentsDto {
  @ApiProperty({
    name: 'commentSeq',
    description: '댓글 seq',
    example: '',
  })
  boardSeq: number;

  @ApiProperty({
    name: 'commentSeq',
    description: '댓글 seq',
    example: '',
  })
  commentSeq: number;

  @ApiProperty({
    name: 'parentCommentSeq',
    description: '부모 댓글 seq',
    example: '',
  })
  parentCommentSeq: number;

  @ApiProperty({
    name: 'writer',
    description: '작성자',
    example: '',
  })
  writer: string;

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
}
