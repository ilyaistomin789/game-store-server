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
    const categories: ICategoryPostgre[] = await this.categoryRepository.find({
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

  public async deleteProductById(productId: string): Promise<void> {
    await this.productRepository.delete({ id: +productId });
  }

  public async getProductById(productId: string): Promise<IProductPostgres> {
    return await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.categories', 'category')
      .where('product.id = :productId', { productId: +productId })
      .getOne();
  }

  public async updateProductById(productId: string, data: IProductPostgres): Promise<void> {
    if (data.categories) {
      data.categories = await this.categoryRepository.findByIds(data.categories);
    }
    const product = await this.productRepository.findOne({ id: +productId });
    await this.productRepository.save({
      ...product,
      ...data,
    });
  }
}
