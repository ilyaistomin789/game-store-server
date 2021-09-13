import IController from '../types/controller';
import { Router } from 'express';
import GetCategoryService from '../services/category/getCategoryService';
import CreateCategoryService from '../services/category/createCategoryService';

class CategoryController implements IController {
  public path: string;
  public router = Router();
  constructor(path: string) {
    this.path = path;
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get(this.path, GetCategoryService);
    this.router.post(this.path, CreateCategoryService);
  }
}

export default CategoryController;
