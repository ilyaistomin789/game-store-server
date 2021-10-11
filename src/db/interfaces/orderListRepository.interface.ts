import { IOrderListDto } from './orderList.interface';
import { Schema } from 'mongoose';

export default interface IOrderListRepository {
  addOrder(data: IOrderListDto): Promise<void>;
  editOrder(data: IOrderListDto): Promise<void>;
  clearOrderList(accountId: number | Schema.Types.ObjectId): Promise<void>;
}
