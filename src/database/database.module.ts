import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';
import config from 'src/config/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { database } = configService;
        if (process.env.NODE_ENV === 'production') {
          return {
            type: 'postgres',
            entities: [
              join(__dirname, '../**/models/**.model{.ts,.js}'),
              join(__dirname, '../e-learning/**/models/**.model{.ts,.js}'),
            ],
            synchronize: true,
            autoLoadEntities: true,
            url: process.env.DATABASE_URL,
            ssl: {
              rejectUnauthorized: false,
            },
          };
        }
        return {
          type: 'postgres',
          host: database.host,
          port: database.port,
          username: database.username,
          password: database.password,
          database: database.name,
          entities: [
            join(__dirname, '../**/models/**.model{.ts,.js}'),
            join(__dirname, '../e-learning/**/models/**.model{.ts,.js}'),
          ],
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
