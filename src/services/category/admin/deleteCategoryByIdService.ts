import { CategoryRepository } from '../../../db';
import { NextFunction, Response, Request } from 'express';

const deleteCategoryByIdService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await CategoryRepository.deleteCategoryById(id);
    res.send('Category deleted successfully');
  } catch (e) {
    res.status(400);
    next(e);
  }
};
export default deleteCategoryByIdService;
