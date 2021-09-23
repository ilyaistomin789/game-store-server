import { ICategoryPostgre } from '../interfaces/category.interface';
import ICategoryRepository from '../interfaces/categoryRepository.interface';
import { getConnection, Repository } from 'typeorm';
import Category from '../postgres/entity/category';

export default class CategoryTypeOrmRepository implements ICategoryRepository<ICategoryPostgre> {
  private categoryRepository: Repository<ICategoryPostgre> = getConnection().getRepository(Category);
  public async createCategory(category: ICategoryPostgre): Promise<void> {
    const newCategory = new Category();
    newCategory.displayName = category.displayName;
    await this.categoryRepository.save(newCategory);
  }

  public async getCategory(): Promise<ICategoryPostgre[]> {
    return await this.categoryRepository.find();
  }
}
