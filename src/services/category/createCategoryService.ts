import { Request, Response } from 'express';
import { CategoryRepository } from '../../db';
import { logger } from '../../logger';
import { NODE_ENV, DB } from '../../config';
const createCategoryService = async (req: Request, res: Response): Promise<void> => {
  try {
    NODE_ENV !== 'production' && DB === 'mongo' && logger.debug(req.body);
    logger.debug(req.body);
    const { displayName } = req.body;
    await CategoryRepository.createCategory({ displayName });
    res.send('Category created successfully');
  } catch (e) {
    res.send(e.message);
  }
};

export default createCategoryService;
