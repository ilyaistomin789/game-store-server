import { NextFunction, Request, Response } from 'express';
import { OrderListRepository } from '../../db';

const addOrderService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id, _id } = req.user;
    const { productId, quantity } = req.body;
    const data = {
      accountId: _id ? _id : id,
      productId: productId,
      quantity: quantity,
    };
    await OrderListRepository.addOrder(data);
    res.send('Order was created successfully');
  } catch (e) {
    res.status(400);
    next(e);
  }
};
export default addOrderService;
