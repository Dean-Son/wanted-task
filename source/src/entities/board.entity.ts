import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TbComment } from './comment.entity';

@Entity('tbBoard')
export class TbBoard {
  @ApiProperty({ description: '게시판 시퀀스', example: 15 })
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'board_seq',
    comment: '시퀀스 번호',
  })
  public boardSeq: number;

  @ApiProperty({ description: '게시판 제목', example: '게시판 제목' })
  @Column({
    type: 'varchar',
    name: 'title',
    comment: '게시판 제목',
    length: 100,
    nullable: false,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '게시판 내용', example: '게시판 내용' })
  @Column({
    type: 'varchar',
    name: 'content',
    comment: '게시판 내용',
    length: 500,
    nullable: false,
  })
  @IsNotEmpty()
  content: string;

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

  @ApiProperty({ description: '비밀번호', example: 'password' })
  @Column({
    type: 'varchar',
    name: 'passwd',
    comment: '작성자',
    length: 100,
    nullable: false,
  })
  passwd: string;

  @ApiProperty({ description: '삭제여부', example: '0' })
  @Column({
    type: 'tinyint',
    name: 'is_delete',
    comment: '게시글 삭제여부',
    nullable: false,
    default: 0,
  })
  isDelete: number;

  @ApiProperty({ description: '등록일', example: '2023-03-01 00:00:00' })
  @CreateDateColumn({
    name: 'create_dt',
    type: 'datetime',
    comment: '생성일',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDt: string;

  @ApiProperty({ description: '수정일', example: '2023-03-01 00:00:00' })
  @UpdateDateColumn({
    name: 'update_dt',
    type: 'datetime',
    comment: '수정일',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateDt: string;

  @OneToMany(() => TbComment, (comment) => comment.board)
  comments?: TbComment[];
}
