import { Request } from 'express-serve-static-core';
import { NextFunction, Response } from 'express';
import { OrderListRepository } from '../../db';

const cleanOrderListService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id, _id } = req.user;
    await OrderListRepository.clearOrderList(_id ? _id : id);
    res.send('Order list was cleared successfully');
  } catch (e) {
    res.status(400);
    next(e);
  }
};
export default cleanOrderListService;
