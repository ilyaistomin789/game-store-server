import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
const checkPasswordMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const oldPassword = req.body.oldPassword;
    const { password } = req.user;
    const comparePassword = await bcrypt.compare(oldPassword, password);
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
