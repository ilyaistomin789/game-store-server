import IProductRepository from '../interfaces/productRepository.interface';
import { IProductPostgres } from '../interfaces/product.interface';
import Product from '../postgres/entity/product';
import { getConnectionManager } from 'typeorm';
import { ICategoryPostgre } from '../interfaces/category.interface';
import Category from '../postgres/entity/category';

export default class ProductTypeOrmRepository implements IProductRepository<IProductPostgres> {
  private manager = getConnectionManager().get('default');
  private productRepository = this.manager.getRepository<IProductPostgres>(Product);
  private categoryRepository = this.manager.getRepository<ICategoryPostgre>(Category);
  public async createProduct(product: IProductPostgres, categoryIds: number[]): Promise<void> {
    const idArray = [];
    categoryIds.forEach((id) => idArray.push({ id: id }));
    const categories = await this.categoryRepository.find({
      where: idArray,
    });
    if (categories) {
      const newProduct = new Product();
      newProduct.displayName = product.displayName;
      newProduct.categories = categories;
      newProduct.price = product.price;
      newProduct.totalRating = product.totalRating;
      await this.productRepository.save(newProduct);
    }
  }

  public async getProduct(): Promise<IProductPostgres[]> {
    return await this.productRepository.find();
  }
}
