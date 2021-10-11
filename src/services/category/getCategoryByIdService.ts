import { NextFunction, Request, Response } from 'express';
import { DB } from '../../config/config';
import { categoryPostgreHandler, categoryMongoHandler } from '../../handlers/getCategoriesHandler';

const getCategoryByIdService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (DB === 'mongo') {
      await categoryMongoHandler(req, res, next);
    } else if (DB === 'pg') {
      await categoryPostgreHandler(req, res, next);
    }
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export default getCategoryByIdService;
