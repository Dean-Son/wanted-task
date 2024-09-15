import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PageOptionsDto {
  private _skip: number;
  @ApiProperty({
    description: '페이지 번호',
    minimum: 1,
    default: 1,
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @IsInt()
  readonly page?: number = 1;

  @ApiProperty({
    description: '페이지 최대 레코드 수',
    minimum: 0,
    maximum: 50,
    default: 10,
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  @Max(50)
  @IsInt()
  readonly take?: number = 10;
}
