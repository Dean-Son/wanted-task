import { ApiProperty } from '@nestjs/swagger';

export class RequestSetBoardsDto {
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
