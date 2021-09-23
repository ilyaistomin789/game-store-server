import { NextFunction, Request, Response } from 'express';
import { AccountRepository } from '../../db';
const updateAccountService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName } = req.body;
    const { _id, id } = req.user;

    await AccountRepository.updateAccount(_id ? _id : id, { firstName, lastName });
    res.send('Account was updated');
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export default updateAccountService;
