import { Schema } from 'mongoose';

export default interface IProductRepository<T> {
  createProduct(product: T, categoryIds: Schema.Types.ObjectId[] | number[]): Promise<void>;
  getProduct(): Promise<T[]>;
  getProductById(productId: string): Promise<T>;
  updateProductById(productId: string, data: T): Promise<void>;
  deleteProductById(productId: string): Promise<void>;
}
