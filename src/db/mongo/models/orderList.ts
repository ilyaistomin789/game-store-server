import { ModelOptions, prop, Severity } from '@typegoose/typegoose';
import { IAccountMongo } from '../../interfaces/account.interface';
import { IOrderListMongo } from '../../interfaces/orderList.interface';
import OrderDetails from './orderDetails';
import { Schema } from 'mongoose';

@ModelOptions({ schemaOptions: { timestamps: true }, options: { allowMixed: Severity.ALLOW } })
export default class OrderList implements IOrderListMongo {
  @prop()
  accountId: Schema.Types.ObjectId;
  @prop()
  orderDetails: OrderDetails[];
}
