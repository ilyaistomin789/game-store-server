import { NextFunction, Request, Response } from 'express';

import { DB } from '../../config/config';
import { productsMongoHandler, productsPostgresHandler } from '../../handlers/getProductsHandler';

const getProductService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (DB === 'mongo') {
      await productsMongoHandler(req, res, next);
    } else if (DB === 'pg') {
      await productsPostgresHandler(req, res, next);
    }
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export default getProductService;
