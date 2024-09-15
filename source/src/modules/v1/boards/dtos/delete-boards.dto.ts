import { ApiProperty } from '@nestjs/swagger';

export class RequestDeleteBoardsDto {
  @ApiProperty({
    description: '작성자',
    example: '',
    required: true,
  })
  writer: string;

  @ApiProperty({
    description: '게시글 비밀번호',
    example: '',
    required: true,
  })
  password: string;
}

export class ResponseDeleteBoardsDto {
  // @ApiProperty({
  //   name: 'title',
  //   description: '보상 지급상태',
  //   example: true,
  // })
  // status: boolean;
  // @ApiProperty({
  //   name: 'miningType',
  //   description: '채굴 타입',
  //   example: 'bdp',
  // })
  // miningType: string;
  // @ApiProperty({
  //   name: 'reward',
  //   description: '보상 지급량',
  //   example: 100,
  // })
  // reward: number;
}
