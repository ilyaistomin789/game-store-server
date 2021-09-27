import IController from '../types/controller';
import { Router } from 'express';
import GetCategoryService from '../services/category/getCategoryService';
import GetCategoryByIdService from '../services/category/getCategoryByIdService';
import CreateCategoryService from '../services/category/createCategoryService';
import checkRolesMiddleware from '../middlewares/checkRolesMiddleware';
import GetCategoryByIdAdminService from '../services/category/admin/getCategoryByIdService';
import UpdateCategoryByIdService from '../services/category/admin/updateCategoryByIdService';
import DeleteCategoryByIdService from '../services/category/admin/deleteCategoryByIdService';
import passport from 'passport';

class CategoryController implements IController {
  public path: string;
  public router = Router();
  constructor(path: string) {
    this.path = path;
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get(this.path, GetCategoryService);
    this.router.get(`${this.path}/:id`, GetCategoryByIdService);
    this.router.post(this.path, CreateCategoryService);
    this.router.get(
      `/admin${this.path}/:id`,
      passport.authenticate('jwt', { session: false }),
      checkRolesMiddleware(['admin']),
      GetCategoryByIdAdminService
    );
    this.router.post(
      `/admin${this.path}`,
      passport.authenticate('jwt', { session: false }),
      checkRolesMiddleware(['admin']),
      CreateCategoryService
    );
    this.router.patch(
      `/admin${this.path}/:id`,
      passport.authenticate('jwt', { session: false }),
      checkRolesMiddleware(['admin']),
      UpdateCategoryByIdService
    );
    this.router.delete(
      `/admin${this.path}/:id`,
      passport.authenticate('jwt', { session: false }),
      checkRolesMiddleware(['admin']),
      DeleteCategoryByIdService
    );
  }
}

export default CategoryController;
