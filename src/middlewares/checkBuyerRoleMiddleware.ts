import { NextFunction, Request, Response } from 'express';

const checkBuyerRoleMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user.role === 'buyer') {
    next();
  } else {
    res.status(400);
    res.send('Invalid role');
  }
};
export default checkBuyerRoleMiddleware;
