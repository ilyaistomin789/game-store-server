import ICategoryRepository from '../interfaces/categoryRepository.interface';
import ICategory from '../interfaces/category.interface';
import { getModelForClass } from '@typegoose/typegoose';
import Category from '../mongo/models/category';

export default class CategoryTypegooseRepository implements ICategoryRepository<ICategory> {
  private categoryModel = getModelForClass(Category);
  public async createCategory(category: ICategory): Promise<void> {
    await this.categoryModel.create({
      displayName: category.displayName,
    });
  }

  public async getCategory(): Promise<ICategory[]> {
    return await this.categoryModel.find().exec();
  }
}
