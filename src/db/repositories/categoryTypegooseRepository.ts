import ICategoryRepository from '../interfaces/categoryRepository.interface';
import { ICategoryMongo } from '../interfaces/category.interface';
import { getModelForClass } from '@typegoose/typegoose';
import Category from '../mongo/models/category';

export default class CategoryTypegooseRepository implements ICategoryRepository<ICategoryMongo> {
  private categoryModel = getModelForClass(Category);
  public async createCategory(category: ICategoryMongo): Promise<void> {
    await this.categoryModel.create({
      displayName: category.displayName,
    });
  }

  public async getCategory(): Promise<ICategoryMongo[]> {
    return await this.categoryModel.find({}, 'displayName').exec();
  }
}
