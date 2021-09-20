import { Request, Response, NextFunction } from 'express';
import { AccountRepository } from '../../db';

const registerAccountService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { firstName, lastName, username, password } = req.body;
    await AccountRepository.registerAccount({ firstName, lastName, username, password });
    res.send('Account created successfully');
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export default registerAccountService;
