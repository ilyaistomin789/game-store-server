import { Router } from 'express';
import GetProductService from '../services/product/getProductService';
import PostProductService from '../services/product/createProductService';
import GetProductByIdService from '../services/product/admin/getProductByIdService';
import UpdateProductByIdService from '../services/product/admin/updateProductByIdService';
import DeleteProductByIdService from '../services/product/admin/deleteProductByIdService';
import IController from '../types/controller';
import checkRolesMiddleware from '../middlewares/checkRolesMiddleware';
import passport from 'passport';

class ProductController implements IController {
  public router = Router();
  public path: string;

  constructor(path: string) {
    this.path = path;
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get(this.path, GetProductService);
    this.router.post(this.path, PostProductService);
    this.router.get(
      `/admin${this.path}/:id`,
      passport.authenticate('jwt', { session: false }),
      checkRolesMiddleware(['admin']),
      GetProductByIdService
    );
    this.router.post(
      `/admin${this.path}`,
      passport.authenticate('jwt', { session: false }),
      checkRolesMiddleware(['admin']),
      PostProductService
    );
    this.router.patch(
      `/admin${this.path}/:id`,
      passport.authenticate('jwt', { session: false }),
      checkRolesMiddleware(['admin']),
      UpdateProductByIdService
    );
    this.router.delete(
      `/admin${this.path}/:id`,
      passport.authenticate('jwt', { session: false }),
      checkRolesMiddleware(['admin']),
      DeleteProductByIdService
    );
  }
}

export default ProductController;
