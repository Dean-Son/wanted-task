import { SetMetadata } from '@nestjs/common';

export const TYPEORM_CUSTOM_REPOSITORY = 'TYPEORM_CUSTOM_REPOSITORY';

// eslint-disable-next-line @typescript-eslint/ban-types
export function CustomEntityRepository(entity: Function): ClassDecorator {
  // SetMetadata는 key: value형태이고 TYPEORM_CUSTOM_REPOSITORY가 key가 되고 엔티티가 vaule가 된다.
  return SetMetadata(TYPEORM_CUSTOM_REPOSITORY, entity);
}
