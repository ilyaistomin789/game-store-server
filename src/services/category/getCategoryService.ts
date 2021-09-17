import { ICategory } from '../../db/interfaces/category.interface';
import { Request, Response, NextFunction } from 'express';
import { CategoryRepository } from '../../db';
import { DB } from '../../config';
import { categoryMongoHandler, categoryPostgreHandler } from '../../handlers/getCategoriesHandler';

const getCategoryService = async (req: Request, res: Response, next: NextFunction): Promise<ICategory[] | void> => {
  try {
    const category = await CategoryRepository.getCategory();
    if (Object.keys(category).length !== 0) {
      res.send(category);
    } else {
      res.status(404);
      next(new Error('Categories not found'));
    }
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export default getCategoryService;
