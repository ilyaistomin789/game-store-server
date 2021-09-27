import IProductRepository from '../interfaces/productRepository.interface';
import { IProductMongo } from '../interfaces/product.interface';
import { getModelForClass } from '@typegoose/typegoose';
import Product from '../mongo/models/product';
import Category from '../mongo/models/category';
import { Schema } from 'mongoose';

export default class ProductTypegooseRepository implements IProductRepository<IProductMongo> {
  private productModel = getModelForClass(Product);
  private categoryModel = getModelForClass(Category);
  public async createProduct(product: IProductMongo, categoryIds: Schema.Types.ObjectId[]): Promise<void> {
    const categories: IProductMongo[] = await this.categoryModel.find({ _id: categoryIds });
    if (categories) {
      const newProduct: IProductMongo = await this.productModel.create({
        displayName: product.displayName,
        categories: categories,
        price: product.price,
        totalRating: product.totalRating,
      });
      newProduct && (await this.addProductToCategory(categories, newProduct));
    }
  }

  public async getProduct(): Promise<IProductMongo[]> {
    return await this.productModel.find().exec();
  }
  private async addProductToCategory(categories: IProductMongo[], product: IProductMongo): Promise<void> {
    for (const category of categories) {
      await this.categoryModel.findByIdAndUpdate(
        category._id,
        { $push: { products: `${product._id}` } },
        { new: true, useFindAndModify: false }
      );
    }
  }
  public async getProductById(productId: string): Promise<IProductMongo> {
    return this.productModel.findById(productId);
  }
  public async updateProductById(productId: string, data: IProductMongo): Promise<void> {
    await this.productModel.findOneAndUpdate({ _id: productId }, data);
  }
  public async deleteProductById(productId: string): Promise<void> {
    await this.productModel.remove({ _id: productId });
  }
}
