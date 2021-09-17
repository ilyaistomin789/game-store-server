import { NextFunction, Request, Response } from 'express';
import { ProductRepository } from '../../db';

const createProductService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { displayName, categories, totalRating, price } = req.body;
    await ProductRepository.createProduct({ displayName, totalRating, price }, categories);
    res.send('Product created successfully');
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export default createProductService;
