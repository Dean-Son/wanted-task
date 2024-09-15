import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TbBoard } from './board.entity';

@Entity('tbComment')
export class TbComment {
  @ApiProperty({ description: '댓글 시퀀스', example: 15 })
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'comment_seq',
    comment: '시퀀스 번호',
  })
  public commentSeq: number;

  @ApiProperty({ description: '부모 댓글 시퀀스', example: 15 })
  @Column({
    type: 'int',
    name: 'parent_comment_seq',
    comment: '시퀀스 번호',
  })
  public parentCommentSeq: number;

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

  @ApiProperty({ description: '등록일', example: '2023-03-01 00:00:00' })
  @CreateDateColumn({
    name: 'create_dt',
    type: 'datetime',
    comment: '생성일',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDt: string;

  @ManyToOne(() => TbBoard, (board) => board.comments)
  @JoinColumn({ name: 'board_seq', referencedColumnName: 'boardSeq' })
  board: TbBoard;
}
