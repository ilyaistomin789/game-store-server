import mongoose from 'mongoose';
import { DB_HOST, DB_TEST_DATABASE_NAME, MONGO_PORT } from '../config/config';
import { getModelForClass } from '@typegoose/typegoose';
import Category from '../db/mongo/models/category';
import { ICategoryMongo } from '../db/interfaces/category.interface';
import { IProductMongo } from '../db/interfaces/product.interface';
import Product from '../db/mongo/models/product';

const mongoConnection = {
  async create() {
    await mongoose.connect(`mongodb://${DB_HOST}:${MONGO_PORT}/${DB_TEST_DATABASE_NAME}`);
  },
  async clear() {
    await mongoose.connection.db.dropDatabase();
  },
  async close() {
    await mongoose.connection.close();
  },
  async initCategory(): Promise<ICategoryMongo> {
    return await getModelForClass(Category).create({
      displayName: 'test',
    });
  },
  async initProduct(): Promise<IProductMongo> {
    const category = await this.initCategory();
    return await getModelForClass(Product).create({
      displayName: 'test',
      totalRating: 6.2,
      price: 6.99,
      categories: [category._id],
    });
  },
};

export default mongoConnection;
