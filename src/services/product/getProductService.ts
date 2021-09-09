import Product from '../../db/models/product';
import { ProductI } from '../../db/models/product';
import {Request, Response} from 'express';
const getProductService = async (req: Request, res: Response) : Promise<ProductI[] | void> => {
    try {
        const products: ProductI[] = await Product.find();
        products ? res.json(products) : res.sendStatus(404);
    } catch (e: any) {
        res.send(e && e.message);
    }
}

export default getProductService;