import { Request, Response } from 'express';
import { DB } from '../../config';
import { categoryPostgreHandler, categoryMongoHandler } from '../../handlers/getCategoriesHandler';

const getCategoryByIdService = async (request: Request, response: Response): Promise<void> => {
  try {
    if (DB === 'mongo') {
      await categoryMongoHandler(request, response);
    } else if (DB === 'pg') {
      await categoryPostgreHandler(request, response);
    }
  } catch (e) {
    response.send(e.message);
  }
};

export default getCategoryByIdService;
