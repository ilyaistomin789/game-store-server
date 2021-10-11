import ICategoryRepository from '../interfaces/categoryRepository.interface';
import { ICategoryMongo } from '../interfaces/category.interface';
import { getModelForClass } from '@typegoose/typegoose';
import Category from '../mongo/models/category';
import { Schema } from 'mongoose';

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

  public async deleteCategoryById(categoryId: string): Promise<void> {
    await this.categoryModel.remove({ _id: categoryId });
  }

  public async getCategoryById(categoryId: string): Promise<ICategoryMongo> {
    return this.categoryModel.findById(categoryId);
  }

  public async updateCategoryById(categoryId: string, data: ICategoryMongo): Promise<void> {
    await this.categoryModel.findOneAndUpdate({ _id: categoryId }, data);
  }
}
