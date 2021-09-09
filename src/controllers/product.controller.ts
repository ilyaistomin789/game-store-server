import express from 'express';
import GetProductService from '../services/product/getProductService';
import ControllerI from '../types/controller'

class ProductController implements ControllerI {
    public router = express.Router();
    public path: string;

    constructor(path: string) {
        this.path = path;
        this.initRoutes();
    }

    public initRoutes(): void {
        this.router.get(this.path, GetProductService);
    }
}

export default ProductController;