import { CommonModule } from '@common/common.module';
import { EnvModule } from '@env/env.module';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RouterModule } from './router/router.module';

@Module({
  imports: [
    EnvModule,
    EventEmitterModule.forRoot({
      global: true,
    }),
    /* Config */
    CommonModule,

    /* Routes */
    RouterModule.register(),
  ],
})
export class AppModule {}
