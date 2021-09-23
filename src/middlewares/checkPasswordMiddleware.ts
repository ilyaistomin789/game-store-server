import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
const checkPasswordMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const oldPassword = req.body.password;
    const { password } = req.user;
    const comparePassword = await bcrypt.compare(oldPassword, password);
    if (comparePassword) {
      next();
    } else {
      res.status(400);
      res.send('Invalid password');
    }
  } catch (e) {
    res.status(400);
    next(e);
  }
};
export default checkPasswordMiddleware;
