import { NextFunction, Request, Response } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';

const checkRolesMiddleware = (rolesArray: string[]): RequestHandlerParams => {
  const isIncluded = (userRole: string) => rolesArray.some((role) => role === userRole);
  return (req: Request, res: Response, next: NextFunction): void => {
    if (isIncluded(req.user.role)) {
      next();
    } else {
      res.status(400);
      res.send('Incorrect role');
    }
  };
};
export default checkRolesMiddleware;
