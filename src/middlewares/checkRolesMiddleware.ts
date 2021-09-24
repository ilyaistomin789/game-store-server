import { NextFunction, Request, Response } from 'express';

const checkRolesMiddleware = (rolesArray: string[]) => {
  const isIncluded = (userRole: string) => rolesArray.some((role) => role === userRole);
  return (req: Request, res: Response, next: NextFunction) => {
    if (isIncluded(req.user.role)) {
      next();
    } else {
      res.status(400);
      res.send('Incorrect role');
    }
  };
};
export default checkRolesMiddleware;
