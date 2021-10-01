import { NextFunction, Request, Response } from 'express';
import { AccountRepository } from '../../db';
import { IAccount } from '../../db/interfaces/account.interface';
const updatePasswordService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { newPassword } = req.body;
    const user = <IAccount>req.user;
    await AccountRepository.updatePassword(user._id ? user._id : user.id, newPassword);
    res.send('Password updated successfully');
  } catch (e) {
    next(e);
  }
};

export default updatePasswordService;
