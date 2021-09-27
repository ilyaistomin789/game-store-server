import { NextFunction, Response, Request } from 'express';
import { CategoryRepository } from '../../../db';

const getCategoryByIdService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await CategoryRepository.getCategoryById(id);
    res.json(category);
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export default getCategoryByIdService;
