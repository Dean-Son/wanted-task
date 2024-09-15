import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

export interface ISwaggerOptions {
  title?: string;
  description?: string;
  version?: string;
  tag?: string;
  token?: string;
  prefix?: string;
}

const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    //웹 페이지를 새로고침을 해도 Token 값 유지
    persistAuthorization: true,

    // schema 정보 표시하지 않음
    defaultModelsExpandDepth: -1,
  },
};

export const setupSwagger = (app: INestApplication, swaggerOptions?: ISwaggerOptions | undefined): void => {
  let docBuilder = new DocumentBuilder();
  let endPoint = 'api-docs';

  if (swaggerOptions !== undefined) {
    if (swaggerOptions.prefix) endPoint = `${swaggerOptions.prefix}/${endPoint}`;

    if (swaggerOptions.title) docBuilder = docBuilder.setTitle(swaggerOptions.title);

    if (swaggerOptions.description) docBuilder = docBuilder.setDescription(swaggerOptions.description);

    if (swaggerOptions.version) docBuilder = docBuilder.setVersion(swaggerOptions.version);

    if (swaggerOptions.tag) docBuilder = docBuilder.addTag(swaggerOptions.tag);

    //JWT 토큰 설정
    if (swaggerOptions.token) {
      docBuilder = docBuilder.addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          name: 'JWT',
          in: 'header',
        },
        swaggerOptions.token,
      );
    }
  }

  const options = docBuilder.build();

  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup(endPoint, app, document, swaggerCustomOptions);
};
