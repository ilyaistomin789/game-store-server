import { ICategory } from '../../../db/interfaces/category.interface';
import { NextFunction, Request, Response } from 'express';
import { CategoryRepository } from '../../../db';

const updateCategoryByIdService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data: ICategory = req.body;
    await CategoryRepository.updateCategoryById(id, data);
    res.send('Category updated successfully');
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export default updateCategoryByIdService;
