import { ConnectionOptions } from 'typeorm';
import { POSTGRES_PORT, DB_HOST, DB_PASSWORD, DB_DATABASE_NAME, DB_USERNAME } from '../../config/config';
import path from 'path';
const entities = path.join(__dirname, './../postgres/entity/**/*{.ts,.js}');
const migrations = path.join(__dirname, './../postgres/migration/**/*{.ts,.js}');
const subscribers = path.join(__dirname, './../postgres/subscriber/**/*{.ts,.js}');

export const postgreConfig: ConnectionOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: +POSTGRES_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [entities],
  migrations: [migrations],
  subscribers: [subscribers],
  cli: {
    entitiesDir: path.join(__dirname, './../postgres/entity'),
    migrationsDir: path.join(__dirname, './../postgres/migration'),
    subscribersDir: path.join(__dirname, './../postgres/subscriber'),
  },
};
