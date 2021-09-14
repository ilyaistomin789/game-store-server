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
import { DB_HOST, DB_PORT, DB_DATABASE_NAME } from '../config';
import './mongo/services/logger';
let ProductRepository: IProductRepository<IProduct>;
let CategoryRepository: ICategoryRepository<ICategory>;

export const run = async (): Promise<void> => {
  try {
    if (process.env.DB === 'mongo') {
      await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE_NAME}`);
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
};

export { ProductRepository, CategoryRepository };
//
// static async getRecordsByPage(
//     skip: number,
//     limit: number,
//     sorting: string,
//     category: ? string,
//     podCategory : ? string,
//     from : Date,
//     to: Date
// ): Promise <any> {
//   let query = {
//     category,
//     podCategory
//   };
//   if (category === 'any') {
//   query = {};
// }
// if (podCategory === 'any') {
//   delete query.podCategory;
// }
// const count: number = await Product.count(query)
//     .where('createdAt')
//     .gte(from)
//     .lte(to);
// const products: ProductDoc = await Product.find(query)
//     .sort(sorting)
//     .skip(skip)
//     .limit(limit)
//     .where('createdAt')
//     .gte(from)
//     .lte(to)
//     .populate({
//       path: 'category',
//     })
//     .populate({
//       path: 'podCategory',
//     });
//
// return {
//   count,
//   products
// };
// }
