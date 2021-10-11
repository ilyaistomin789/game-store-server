import { IOrderListPostgres } from './orderList.interface';
import { Schema } from 'mongoose';

export interface IOrderDetailsPostgres {
  id: number;
  order: IOrderListPostgres;
  productId: number;
  quantity: number;
}

export interface IOrderDetailsMongo {
  productId: Schema.Types.ObjectId;
  quantity: number;
}
