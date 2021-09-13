import { Router } from 'express';
import GetProductService from '../services/product/getProductService';
import PostProductService from '../services/product/createProductService';
import IController from '../types/controller';

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
  }
}

export default ProductController;
