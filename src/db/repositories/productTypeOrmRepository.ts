import IProductRepository from '../interfaces/productRepository.interface';
import { IProductPostgres } from '../interfaces/product.interface';
import Product from '../../entity/product';
import { getConnectionManager } from 'typeorm';
import { ICategoryPostgre } from '../interfaces/category.interface';
import Category from '../../entity/category';

export default class ProductTypeOrmRepository implements IProductRepository<IProductPostgres> {
  private manager = getConnectionManager().get('default');
  private productRepository = this.manager.getRepository<IProductPostgres>(Product);
  private categoryRepository = this.manager.getRepository<ICategoryPostgre>(Category);
  public async createProduct(product: IProductPostgres, categoryId: number): Promise<void> {
    const category = await this.categoryRepository.findOne(categoryId);
    if (category) {
      const newProduct = new Product();
      newProduct.displayName = product.displayName;
      newProduct.category = category;
      newProduct.price = product.price;
      newProduct.totalRating = product.totalRating;
      await this.productRepository.save(newProduct);
    }
  }

  public async getProduct(): Promise<IProductPostgres[]> {
    return await this.productRepository.find();
  }
}
