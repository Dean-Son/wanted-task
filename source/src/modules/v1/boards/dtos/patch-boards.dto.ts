import { ApiProperty } from '@nestjs/swagger';

export class RequestPatchBoardsDto {
  @ApiProperty({
    description: '작성자',
    example: '',
    required: true,
  })
  writer: string;

  @ApiProperty({
    description: '제목',
    example: '',
    required: true,
  })
  title: string;

  @ApiProperty({
    description: '내용',
    example: '',
    required: true,
  })
  content: string;

  @ApiProperty({
    description: '게시글 비밀번호',
    example: '',
    required: true,
  })
  password: string;
}

export class ResponsePatchBoardsDto {
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
