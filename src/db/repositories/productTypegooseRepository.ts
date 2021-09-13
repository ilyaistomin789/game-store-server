import IProductRepository from '../interfaces/productRepository.interface';
import { IProductMongo } from '../interfaces/product.interface';
import { getModelForClass } from '@typegoose/typegoose';
import Product from '../mongo/models/product';
import Category from '../mongo/models/category';

export default class ProductTypegooseRepository implements IProductRepository<IProductMongo> {
  private productModel = getModelForClass(Product);
  private categoryModel = getModelForClass(Category);
  public async createProduct(product: IProductMongo, categoryId: number): Promise<void> {
    const category = await this.categoryModel.findById(categoryId);
    if (category) {
      await this.productModel.create({
        displayName: product.displayName,
        category: category,
        price: product.price,
        totalRating: product.totalRating,
      });
    }
  }

  public async getProduct(): Promise<IProductMongo[]> {
    return await this.productModel.find().exec();
  }
}
