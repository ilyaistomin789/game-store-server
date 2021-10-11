import { Response } from 'express-serve-static-core';

import { Request } from 'express-serve-static-core';
import { NextFunction } from 'express';
import { OrderListRepository } from '../../db';
import { IAccount } from '../../db/interfaces/account.interface';
import { IOrderListDto } from '../../db/interfaces/orderList.interface';

const editOrderService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = <IAccount>req.user;
    const { productId, quantity } = req.body;
    const data: IOrderListDto = {
      accountId: user._id ? `${user._id}` : `${user.id}`,
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
