import { NextFunction, Request, Response } from 'express';
import { CategoryRepository } from '../../db';

const createCategoryService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { displayName } = req.body;
    await CategoryRepository.createCategory({ displayName });
    res.send('Category created successfully');
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export default createCategoryService;
