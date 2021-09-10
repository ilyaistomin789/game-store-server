import ICategory from '../interfaces/category.interface';
import ICategoryRepository from '../interfaces/categoryRepository.interface';
import { getConnection, Repository } from 'typeorm';
import Category from '../../entity/category';

export default class CategoryTypeOrmRepository implements ICategoryRepository<ICategory> {
  private categoryRepository: Repository<ICategory> = getConnection().getRepository(Category);
  public async createCategory(category: ICategory): Promise<void> {
    const newCategory = new Category();
    newCategory.displayName = category.displayName;
    await this.categoryRepository.create(newCategory);
  }

  public async getCategory(): Promise<ICategory[]> {
    return await this.categoryRepository.find();
  }
}
