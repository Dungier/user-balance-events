import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import UsersEntity from './shared/entitis/users.entity';
import HistoryEntity from './shared/entitis/history.entity';

const TypeormConfig = (configService: ConfigService): DataSourceOptions => ({
  type: 'postgres',
  url: configService.get<string>('DATABASE'),
  entities: [UsersEntity, HistoryEntity],
  synchronize: false,
  migrations: [],
  extra: {
    poolSize: 30,
    connectionTimeoutMillis: 2000,
    query_timeout: 20000,
    statement_timeout: 20000,
  },
});
export default TypeormConfig;
