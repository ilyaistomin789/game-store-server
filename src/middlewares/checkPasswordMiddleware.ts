import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { IAccount } from '../db/interfaces/account.interface';
const checkPasswordMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const oldPassword = req.body.oldPassword;
    const user = <IAccount>req.user;
    const comparePassword = await bcrypt.compare(oldPassword, user.password);
    if (comparePassword) {
      next();
    } else {
      res.status(400);
      res.send('Something went wrong');
    }
  } catch (e) {
    res.status(400);
    next(e);
  }
};
export default checkPasswordMiddleware;
