import { INestApplication, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { setupSwagger } from './uitl/swagger.util';

async function bootstrap() {
  const app = (await NestFactory.create(AppModule, {
    bufferLogs: true, // 기본 (false) 부트스트랩 중 내장 로거가 사용됨
    abortOnError: false, // 기본 (true) 오류 발생시 서비스 중단
  }).catch(console.error)) as INestApplication;

  const configService = app.get(ConfigService);

  // port
  const port: number = Number(configService.get('HTTP_PORT')) ?? 3000;

  // prefix
  const _prefix = configService.get<string>('PREFIX');
  app.setGlobalPrefix(_prefix, {
    exclude: [
      { path: '/', method: RequestMethod.GET },
      { path: '/favicon.ico', method: RequestMethod.GET },
    ],
  });

  // Swagger
  setupSwagger(app, {
    title: configService.get<string>('APP_NAME'),
    description: 'wanted-ask back-end api documents',
    version: '1.0.1',
    prefix: _prefix,
  });

  app.enableCors();
  app.use(
    helmet({
      xssFilter: true,
    }),
  );
  await app.listen(port);
}
bootstrap();
