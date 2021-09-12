import IProductRepository from './interfaces/productRepository.interface';
import { IProduct } from './interfaces/product.interface';
import ProductTypegooseRepository from './repositories/productTypegooseRepository';
import ProductTypeOrmRepository from './repositories/productTypeOrmRepository';
import ICategoryRepository from './interfaces/categoryRepository.interface';
import { ICategory } from './interfaces/category.interface';
import CategoryTypeOrmRepository from './repositories/categoryTypeOrmRepository';
import CategoryTypegooseRepository from './repositories/categoryTypegooseRepository';
import mongoose from 'mongoose';
import { createConnection } from 'typeorm';
import { postgreConfig } from './config/config';

let ProductRepository: IProductRepository<IProduct>;
let CategoryRepository: ICategoryRepository<ICategory>;

export const run = async (): Promise<void> => {
  try {
    if (process.env.DB === 'mongo') {
      await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE_NAME}`);
      ProductRepository = new ProductTypegooseRepository();
      CategoryRepository = new CategoryTypegooseRepository();
    } else if (process.env.DB === 'pg') {
      await createConnection(postgreConfig);
      ProductRepository = new ProductTypeOrmRepository();
      CategoryRepository = new CategoryTypeOrmRepository();
    }
  } catch (e) {
    console.log(e.message);
  }
  //TODO ETD, Init models postgre
};

export { ProductRepository, CategoryRepository };
