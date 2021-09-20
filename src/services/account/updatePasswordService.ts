import { NextFunction, Request, Response } from 'express';
import { AccountRepository } from '../../db';
const updatePasswordService = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { username, newPassword } = request.body;
    await AccountRepository.updatePassword(username, newPassword);
    response.send('Password updated successfully');
  } catch (e) {
    next(e);
  }
};

export default updatePasswordService;
