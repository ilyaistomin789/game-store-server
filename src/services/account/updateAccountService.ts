import { NextFunction, Request, Response } from 'express';
import { AccountRepository } from '../../db';
import { IAccount } from '../../db/interfaces/account.interface';
const updateAccountService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName } = req.body;
    const user = <IAccount>req.user;

    await AccountRepository.updateAccount(user._id ? user._id : user.id, { firstName, lastName });
    res.send('Account was updated');
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export default updateAccountService;
