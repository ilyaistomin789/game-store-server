import { ProductRepository } from '../../../db';
import { NextFunction, Response, Request } from 'express';

const deleteProductByIdService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await ProductRepository.deleteProductById(id);
    res.send('Product deleted successfully');
  } catch (e) {
    res.status(400);
    next(e);
  }
};
export default deleteProductByIdService;
