import { Response } from 'express-serve-static-core';

import { Request } from 'express-serve-static-core';
import { NextFunction } from 'express';
import { OrderListRepository } from '../../db';

const editOrderService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id, _id } = req.user;
    const { productId, quantity } = req.body;
    const data = {
      accountId: _id ? _id : id,
      productId: productId,
      quantity: quantity,
    };
    await OrderListRepository.editOrder(data);
    res.send('Order updated successfully');
  } catch (e) {
    res.status(400);
    next(e);
  }
};
export default editOrderService;
