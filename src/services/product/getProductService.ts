import { Request, Response } from 'express';
import { IProduct } from '../../db/interfaces/product.interface';
import { ProductRepository } from '../../db/';
import { DB, NODE_ENV } from '../../config';
import { logger } from '../../logger';

const getProductService = async (req: Request, res: Response): Promise<IProduct[] | void> => {
  try {
    NODE_ENV !== 'production' && DB === 'mongo' && logger.debug(req.body);
    const products = await ProductRepository.getProduct();
    if (products !== null) {
      res.send(products);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.send(e && e.message);
  }
};

export default getProductService;
