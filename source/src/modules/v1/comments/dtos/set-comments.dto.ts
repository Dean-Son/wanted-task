import { ApiProperty } from '@nestjs/swagger';

export class RequestSetCommentsDto {
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
}

export class ResponseSetCommentsDto {}
