import { Schema } from 'mongoose';

export default interface IProductRepository<T> {
  createProduct(product: T, categoryIds: Schema.Types.ObjectId[] | number[]): Promise<void>;
  getProduct(): Promise<T[]>;
}
