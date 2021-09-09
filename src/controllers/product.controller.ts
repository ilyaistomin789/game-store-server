import express from 'express';
import GetProductService from '../services/product/getProductService';

class ProductController {
    public router = express.Router();
    constructor(){
        this.initRoutes();
    }
    private initRoutes(){
        this.router.get('/products', GetProductService);
    }
}
export default ProductController;