import { Request, Response } from 'express';
import { CategoryRepository } from '../../db';

const createCategoryService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { displayName } = req.body;
    await CategoryRepository.createCategory({ displayName });
    res.send('Category created successfully');
  } catch (e) {
    res.send(e.message);
  }
};

export default createCategoryService;
