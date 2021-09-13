import { ICategory } from '../../db/interfaces/category.interface';
import { Request, Response } from 'express';
import { CategoryRepository } from '../../db';
import { DB, NODE_ENV } from '../../config';
import { logger } from '../../logger';

const getCategoryService = async (req: Request, res: Response): Promise<ICategory[] | void> => {
  try {
    NODE_ENV !== 'production' && DB === 'mongo' && logger.debug(req.body);
    const category = await CategoryRepository.getCategory();
    if (category !== null) {
      res.send(category);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.send(e && e.message);
  }
};

export default getCategoryService;
