import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export async function mysqlConnectionConfig(configService: ConfigService) {
  return {
    type: 'mysql',
    replication: {
      master: {
        host: configService.get('MASTER_HOST'),
        port: configService.get('MASTER_PORT'),
        database: configService.get('MASTER_DATABASE'),
        username: configService.get('MASTER_USERNAME'),
        password: configService.get('MASTER_PASSWORD'),
      },
      slaves: [
        {
          host: configService.get('SLAVE_HOST'),
          port: configService.get('SLAVE_PORT'),
          database: configService.get('SLAVE_DATABASE'),
          username: configService.get('SLAVE_USERNAME'),
          password: configService.get('SLAVE_PASSWORD'),
        },
      ],
    },
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: false,
    logging: configService.get<string>('MYSQL_LOGGING_OPTIONS')?.split(',') ?? 'error',
    charset: 'utf8mb4_unicode_ci',
  } as TypeOrmModuleOptions;
}
