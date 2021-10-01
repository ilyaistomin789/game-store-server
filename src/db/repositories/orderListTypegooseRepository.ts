import IOrderListRepository from '../interfaces/orderListRepository.interface';
import { IOrderListDto, IOrderListMongo } from '../interfaces/orderList.interface';
import mongoose, { FilterQuery, Schema } from 'mongoose';
import { getModelForClass } from '@typegoose/typegoose';
import OrderList from '../mongo/models/orderList';

export default class OrderListTypegooseRepository implements IOrderListRepository {
  private orderListModel = getModelForClass(OrderList);
  public async addOrder(data: IOrderListDto): Promise<void> {
    const orderExists: IOrderListMongo = await this.orderListModel.findOne({
      accountId: new mongoose.mongo.ObjectId(data.accountId),
    });
    if (!orderExists) {
      await this.orderListModel.create({
        accountId: data.accountId,
        orderDetails: [
          {
            productId: data.productId,
            quantity: data.quantity,
          },
        ],
      });
    } else {
      if (
        orderExists.orderDetails.some((order) => `${order.productId}` === `${data.productId}`) &&
        `${orderExists.accountId}` === `${data.accountId}`
      ) {
        const detailIndex: number = orderExists.orderDetails.findIndex(
          (detail) => `${detail.productId}` === `${data.productId}`
        );
        orderExists.orderDetails[detailIndex].quantity += data.quantity;
        await this.orderListModel.findOneAndUpdate(
          { accountId: new mongoose.mongo.ObjectId(data.accountId) },
          { $set: { orderDetails: orderExists.orderDetails } }
        );
      } else {
        await this.orderListModel.findOneAndUpdate(
          { accountId: new mongoose.mongo.ObjectId(data.accountId) },
          { $push: { orderDetails: { productId: data.productId, quantity: data.quantity } } }
        );
      }
    }
  }

  public async clearOrderList(accountId: Schema.Types.ObjectId): Promise<void> {
    await this.orderListModel.remove({ accountId });
  }

  public async editOrder(data: IOrderListDto): Promise<void> {
    const order: IOrderListMongo = await this.orderListModel.findOne({
      accountId: new mongoose.mongo.ObjectId(data.accountId),
    });
    const detailIndex: number = order.orderDetails.findIndex((detail) => `${detail.productId}` === `${data.productId}`);
    if (data.quantity === 0) {
      order.orderDetails = order.orderDetails.filter((detail) => `${detail.productId}` !== `${data.productId}`);
      await this.orderListModel.findOneAndUpdate(
        { accountId: new mongoose.mongo.ObjectId(data.accountId) },
        { $set: { orderDetails: order.orderDetails } }
      );
    } else {
      order.orderDetails[detailIndex].quantity = data.quantity;
      await this.orderListModel.findOneAndUpdate(
        { accountId: new mongoose.mongo.ObjectId(data.accountId) },
        { $set: { orderDetails: order.orderDetails } }
      );
    }
  }
}
