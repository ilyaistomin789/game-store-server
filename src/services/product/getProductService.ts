import Product from '../../db/models/product';
import { ProductI } from '../../db/models/product';
import { Request, Response } from 'express';
const getProductService = async (req: Request, res: Response): Promise<ProductI[] | void> => {
  try {
    const products: ProductI[] = await Product.find(); // ProductRep.getProd(query)
    if (!products.length) {
      res.sendStatus(404);
    } else {
      res.json(products);
    }
  } catch (e: any) {
    res.send(e && e.message);
  }
};

export default getProductService;
