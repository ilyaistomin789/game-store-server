import { NextFunction, Request, Response } from 'express';
import { AccountRepository } from '../../db';
const updateAccountService = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { username, firstName, lastName } = request.body;
    await AccountRepository.updateAccount({ username, firstName, lastName });
    response.send('Account was updated');
  } catch (e) {
    response.status(400);
    next(e);
  }
};

export default updateAccountService;
