import { Schema } from 'mongoose';

export default interface ICategoryRepository<T> {
  createCategory(category: T): Promise<void>;
  getCategory(): Promise<T[]>;
  getCategoryById(categoryId: string): Promise<T>;
  updateCategoryById(categoryId: string, data: T): Promise<void>;
  deleteCategoryById(categoryId: string): Promise<void>;
}
