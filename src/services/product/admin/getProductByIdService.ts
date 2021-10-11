import { NextFunction, Response, Request } from 'express';
import { ProductRepository } from '../../../db';

const getProductByIdService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await ProductRepository.getProductById(id);
    res.json(product);
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export default getProductByIdService;
