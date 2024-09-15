import { DynamicModule, Module } from '@nestjs/common';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';
import { RoutesV1Module } from './routes/routes-v1.module';

@Module({})
export class RouterModule {
  static register(): DynamicModule {
    return {
      module: RouterModule,
      controllers: [],
      providers: [],
      exports: [],
      imports: [
        RoutesV1Module,
        NestJsRouterModule.register([
          {
            path: '/v1',
            module: RoutesV1Module,
          },
        ]),
      ],
    };
  }
}
