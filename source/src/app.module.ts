import { CommonModule } from '@common/common.module';
import { EnvModule } from '@env/env.module';
import { Module } from '@nestjs/common';
import { RouterModule } from './router/router.module';

@Module({
  imports: [
    EnvModule,
    /* Config */
    CommonModule,

    /* Routes */
    RouterModule.register(),
  ],
})
export class AppModule {}
