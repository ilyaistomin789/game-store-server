import { NextFunction, Request, Response } from 'express';
import { ProductRepository } from '../../../db';
import { IProduct } from '../../../db/interfaces/product.interface';

const updateProductByIdService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data: IProduct = req.body;
    await ProductRepository.updateProductById(id, data);
    res.send('Product updated successfully');
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export default updateProductByIdService;
