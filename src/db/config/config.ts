import { ConnectionOptions } from 'typeorm';
import { POSTGRES_PORT, DB_HOST, DB_PASSWORD, DB_DATABASE_NAME, DB_USERNAME } from '../../config/config';

export const postgreConfig: ConnectionOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: +POSTGRES_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: ['src/db/postgres/entity/**/*.ts'],
  migrations: ['src/db/postgres/migration/**/*.ts'],
  subscribers: ['src/db/postgres/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/db/postgres/entity',
    migrationsDir: 'src/db/postgres/migration',
    subscribersDir: 'src/db/postgres/subscriber',
  },
};
