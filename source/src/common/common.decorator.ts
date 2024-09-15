import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { DtoResponse } from './dtos/dto.response';

export const ResponseDtoType = <T extends Type<unknown>>(t: T) =>
  applyDecorators(
    ApiExtraModels(DtoResponse, t),
    ApiOkResponse({
      schema: {
        title: `ResponseDtoTypeOf${t.name}`,
        allOf: [
          { $ref: getSchemaPath(DtoResponse) },
          {
            properties: {
              data: { $ref: getSchemaPath(t) },
            },
          },
        ],
      },
    }),
  );
