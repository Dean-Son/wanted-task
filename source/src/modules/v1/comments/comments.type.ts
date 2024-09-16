import { TbComment } from '@entities/comment.entity';

export type commentsPageType = {
  totalCount: number;
  commentList: TbComment[];
};
