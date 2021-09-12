import { Schema } from 'mongoose';

export default interface IProductRepository<T> {
  createProduct(product: T, categoryId: Schema.Types.ObjectId | number): Promise<void>;
  getProduct(): Promise<T[]>;
}
