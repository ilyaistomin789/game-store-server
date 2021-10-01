import { NextFunction, Request, Response } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
import { IAccount } from '../db/interfaces/account.interface';

const checkRolesMiddleware = (rolesArray: string[]): RequestHandlerParams => {
  const isIncluded = (userRole: string) => rolesArray.some((role) => role === userRole);
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = <IAccount>req.user;
    if (isIncluded(user.role)) {
      next();
    } else {
      res.status(400);
      res.send('Incorrect role');
    }
  };
};
export default checkRolesMiddleware;
