import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validationEnv } from 'src/env/validation.env';

@Module({
  controllers: [],
  providers: [],
  imports: [
    /* 기본 NestJS 설정 */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${__dirname}/.${process.env.NODE_ENV}.env`],
      validationSchema: validationEnv(),
    }),
    /* 비즈니스 모듈 */
  ],
})
export class EnvModule {}
