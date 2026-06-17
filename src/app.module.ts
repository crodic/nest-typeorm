import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database/config/database.config';
import appConfig from './config/app.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options?: DataSourceOptions) => {
        if (!options) throw new Error('Invalid options passed');
        return new DataSource(options).initialize();
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
