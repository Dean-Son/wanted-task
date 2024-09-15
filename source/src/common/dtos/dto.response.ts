import { ErrDesc } from '@common/constants/error.constants';
import { ApiProperty } from '@nestjs/swagger';

export class DtoResponse<Tdata> {
  @ApiProperty({
    description: '코드',
    example: ErrDesc.OK__SUCCESS,
  })
  code: string;

  @ApiProperty({ description: '데이터' })
  data: Tdata;
}
