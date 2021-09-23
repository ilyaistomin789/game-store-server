import { NextFunction, Request, Response } from 'express';
import { AccountRepository } from '../../db';
const updatePasswordService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { newPassword } = req.body;
    const { id, _id } = req.user;
    await AccountRepository.updatePassword(_id ? _id : id, newPassword);
    res.send('Password updated successfully');
  } catch (e) {
    next(e);
  }
};

export default updatePasswordService;
