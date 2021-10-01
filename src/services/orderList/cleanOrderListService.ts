import { Request } from 'express-serve-static-core';
import { NextFunction, Response } from 'express';
import { OrderListRepository } from '../../db';
import { IAccount } from '../../db/interfaces/account.interface';

const cleanOrderListService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = <IAccount>req.user;
    await OrderListRepository.clearOrderList(user._id ? user._id : user.id);
    res.send('Order list was cleared successfully');
  } catch (e) {
    res.status(400);
    next(e);
  }
};
export default cleanOrderListService;
