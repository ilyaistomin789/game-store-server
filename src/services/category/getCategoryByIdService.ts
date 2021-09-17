import { NextFunction, Request, Response } from 'express';
import { DB } from '../../config';
import { categoryPostgreHandler, categoryMongoHandler } from '../../handlers/getCategoriesHandler';

const getCategoryByIdService = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    if (DB === 'mongo') {
      await categoryMongoHandler(request, response, next);
    } else if (DB === 'pg') {
      await categoryPostgreHandler(request, response, next);
    }
  } catch (e) {
    response.status(400);
    next(e);
  }
};

export default getCategoryByIdService;
