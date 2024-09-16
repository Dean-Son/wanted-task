import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbKeyword')
export class TbKeyword {
  @ApiProperty({ description: '키워드 시퀀스', example: 15 })
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'keyword_seq',
    comment: '시퀀스 번호',
  })
  public keywordSeq: number;

  @ApiProperty({ description: '작성자', example: '작성자' })
  @Column({
    type: 'varchar',
    name: 'writer',
    comment: '작성자',
    length: 50,
    nullable: false,
  })
  @IsNotEmpty()
  writer: string;

  @ApiProperty({ description: '키워드', example: '키워드' })
  @Column({
    type: 'varchar',
    name: 'keyword',
    comment: '키워드',
    length: 50,
    nullable: false,
  })
  @IsNotEmpty()
  keyword: string;

  @ApiProperty({ description: '등록일', example: '2023-03-01 00:00:00' })
  @CreateDateColumn({
    name: 'create_dt',
    type: 'datetime',
    comment: '생성일',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDt: string;
}
