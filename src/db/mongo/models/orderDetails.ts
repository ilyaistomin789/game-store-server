import { prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { IOrderDetailsMongo } from '../../interfaces/orderDetails.interface';

export default class OrderDetails implements IOrderDetailsMongo {
  @prop()
  productId: Schema.Types.ObjectId;
  @prop()
  quantity: number;
}
