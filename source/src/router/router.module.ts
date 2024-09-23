import { BoardsModule } from '@modules/v1/boards/boards.module';
import { CommentsModule } from '@modules/v1/comments/comments.module';
import { keywordsModule } from '@modules/v1/keywords/keywords.module';
import { DynamicModule, Module } from '@nestjs/common';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';

@Module({})
export class RouterModule {
  static register(): DynamicModule {
    return {
      module: RouterModule,
      controllers: [],
      providers: [],
      exports: [],
      imports: [
        BoardsModule,
        CommentsModule,
        keywordsModule,
        NestJsRouterModule.register([
          {
            path: '/v1',
            module: BoardsModule,
          },
        ]),
        NestJsRouterModule.register([
          {
            path: '/v1',
            module: CommentsModule,
          },
        ]),
        NestJsRouterModule.register([
          {
            path: '/v1',
            module: keywordsModule,
          },
        ]),
      ],
    };
  }
}
