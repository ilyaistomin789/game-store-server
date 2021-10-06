import * as path from 'path';
import { createConnection, getConnection } from 'typeorm';
import { DB_TEST_DATABASE_NAME, DB_HOST, DB_PASSWORD, DB_USERNAME, POSTGRES_PORT } from '../config/config';
import { ICategoryPostgre } from '../db/interfaces/category.interface';
import Category from '../db/postgres/entity/category';
import { IProductPostgres } from '../db/interfaces/product.interface';
import Product from '../db/postgres/entity/product';

const postgresConnection = {
  async create() {
    const entities = path.join(__dirname, './../db/postgres/entity/**/*{.ts,.js}');
    const migrations = path.join(__dirname, './../db/postgres/migration/**/*{.ts,.js}');
    const subscribers = path.join(__dirname, './../db/postgres/subscriber/**/*{.ts,.js}');
    await createConnection({
      name: 'default',
      type: 'postgres',
      host: DB_HOST,
      port: +POSTGRES_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_TEST_DATABASE_NAME,
      synchronize: true,
      logging: false,
      dropSchema: true,
      entities: [entities],
      migrations: [migrations],
      subscribers: [subscribers],
      cli: {
        entitiesDir: path.join(__dirname, './../db/postgres/entity'),
        migrationsDir: path.join(__dirname, './../db/postgres/migration'),
        subscribersDir: path.join(__dirname, './../db/postgres/subscriber'),
      },
    });
  },
  async clear() {
    const connection = getConnection('default');
    const entities = connection.entityMetadatas;
    await Promise.all(
      entities.map(async (entity) => {
        const repository = connection.getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName}`);
      })
    );
  },
  get() {
    return getConnection('default');
  },
  async close() {
    await getConnection('default').close();
  },
  async initCategory(): Promise<ICategoryPostgre> {
    const category = new Category();
    category.displayName = 'test';
    return await getConnection('default').getRepository(Category).save(category);
  },
  async initProduct(): Promise<IProductPostgres> {
    const category = await this.initCategory();
    const product = new Product();
    product.displayName = 'test';
    product.price = 7.99;
    product.totalRating = 6;
    product.categories = [category];
    return await getConnection('default').getRepository(Product).save(product);
  },
};

export default postgresConnection;
