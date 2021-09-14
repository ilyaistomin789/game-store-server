import { Request, Response } from 'express';
import { IProduct } from '../../db/interfaces/product.interface';

import { DB } from '../../config';
import { productsMongoHandler, productsPostgresHandler } from '../../handlers/getProductsHandler';

const getProductService = async (req: Request, res: Response): Promise<void> => {
  try {
    if (DB === 'mongo') {
      await productsMongoHandler(req, res);
    } else if (DB === 'pg') {
      await productsPostgresHandler(req, res);
    }
  } catch (e) {
    res.send(e && e.message);
  }
};

export default getProductService;
