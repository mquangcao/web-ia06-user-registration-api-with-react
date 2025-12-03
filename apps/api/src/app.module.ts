import { Module } from '@nestjs/common';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { getConfig } from './lib/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: getConfig('database.type', 'postgres'),
      host: getConfig('database.host'),
      port: parseInt(getConfig('database.port', '5432')),
      username: getConfig('database.username'),
      password: getConfig('database.password'),
      database: getConfig('database.dbName'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
      logging: true, // Enable logging to debug connection issues
    } as TypeOrmModuleOptions),
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
