import { Request, Response, NextFunction } from 'express';
import { AccountRepository } from '../../db';

const registerAccountService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userExists = await AccountRepository.getAccountByUsername(username);
    if (userExists) {
      res.status(409);
      next(new Error('This user is exists'));
    } else {
      await AccountRepository.registerAccount({ firstName, lastName, username, password });
      res.send('Account created successfully');
    }
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export default registerAccountService;
