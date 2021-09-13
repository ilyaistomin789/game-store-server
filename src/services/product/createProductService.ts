import { Request, Response } from 'express';
import { ProductRepository } from '../../db';
import { DB, NODE_ENV } from '../../config';
import { logger } from '../../logger';

const createProductService = async (req: Request, res: Response): Promise<void> => {
  try {
    NODE_ENV !== 'production' && DB === 'mongo' && logger.debug(req.body);
    const { displayName, categoryId, totalRating, price } = req.body;
    await ProductRepository.createProduct({ displayName, totalRating, price }, categoryId);
    res.send('Product created successfully');
  } catch (e) {
    res.send(e.message);
  }
};

export default createProductService;
