import Product from '../../models/product';
import { ProductI } from '../../models/product';
import {Request, Response} from 'express';
const getProductService = async (request: Request, res: Response) => {
    try {
        const products: ProductI[] = await Product.find();
        products ? res.json(products) : res.sendStatus(404);
    } catch ({message}) {
        res.send(message);
    }
}

export default getProductService;