import OrderDetailsPostgres from '../postgres/entity/orderDetails';
import { Schema } from 'mongoose';
import OrderDetailsMongo from '../mongo/models/orderDetails';
export interface IOrderListPostgres {
  id: number;
  accountId: number;
  orderDetails: OrderDetailsPostgres[];
}
export interface IOrderListMongo {
  _id?: Schema.Types.ObjectId;
  accountId: Schema.Types.ObjectId;
  orderDetails: OrderDetailsMongo[];
}

export interface IOrderListDto {
  accountId: string;
  productId: string;
  quantity: number;
}
