import IProductRepository from '../interfaces/productRepository.interface';
import IProduct from '../interfaces/product.interface';
import Product from '../../entity/product';
import { getConnection, getConnectionManager, getRepository, Repository } from 'typeorm';
import ICategory from '../interfaces/category.interface';
import Category from '../../entity/category';

export default class ProductTypeOrmRepository implements IProductRepository<IProduct> {
  private manager = getConnectionManager().get('default');
  private productRepository = this.manager.getRepository<IProduct>(Product);
  public async createProduct(product: IProduct): Promise<void> {
    // TODO: Category
    let newProduct = new Product();
    newProduct.displayName = product.displayName;
    newProduct.category = product.categoryId;
    newProduct.price = product.price;
    newProduct.totalRating = product.totalRating;
    this.productRepository.save(newProduct);
  }

  public async getProduct(): Promise<IProduct[]> {
    return await this.productRepository.find();
  }
}
