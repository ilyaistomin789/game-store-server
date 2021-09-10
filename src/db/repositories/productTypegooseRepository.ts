import IProductRepository from '../interfaces/productRepository.interface';
import IProduct from '../interfaces/product.interface';
import { getModelForClass } from '@typegoose/typegoose';
import Product from '../mongo/models/product';

export default class ProductTypegooseRepository implements IProductRepository<IProduct> {
  private productModel = getModelForClass(Product);
  public async createProduct(product: IProduct): Promise<void> {
    await this.productModel.create({
      displayName: product.displayName,
      categoryId: product.categoryId,
      price: product.price,
      totalRating: product.totalRating,
    });
  }

  public async getProduct(): Promise<IProduct[]> {
    return await this.productModel.find().exec();
  }
}
