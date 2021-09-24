import IOrderListRepository from '../interfaces/orderListRepository.interface';
import { getConnection, Repository } from 'typeorm';
import { IOrderListDto, IOrderListPostgres } from '../interfaces/orderList.interface';
import OrderList from '../postgres/entity/orderList';
import OrderDetails from '../postgres/entity/orderDetails';
import { IOrderDetailsPostgres } from '../interfaces/orderDetails.interface';

export default class OrderListTypeOrmRepository implements IOrderListRepository {
  private orderListRepository: Repository<IOrderListPostgres> = getConnection().getRepository(OrderList);
  private orderDetailsRepository: Repository<IOrderDetailsPostgres> = getConnection().getRepository(OrderDetails);
  public async addOrder(data: IOrderListDto): Promise<void> {
    let orderDetails: IOrderDetailsPostgres;
    const orderExists = await this.orderListRepository.findOne({ accountId: +data.accountId });
    if (!orderExists) {
      const order: IOrderListPostgres = new OrderList();
      order.accountId = +data.accountId;
      const newOrder = await this.orderListRepository.save(order);
      orderDetails = new OrderDetails();
      orderDetails.productId = +data.productId;
      orderDetails.quantity = data.quantity;
      orderDetails.order = newOrder;
      await this.orderDetailsRepository.save(orderDetails);
    } else {
      const orderDetailsExists: IOrderDetailsPostgres = await this.orderDetailsRepository.findOne({
        where: {
          productId: +data.productId,
          order: { accountId: +data.accountId },
        },
        relations: ['order'],
      });
      if (orderDetailsExists) {
        orderDetailsExists.quantity += data.quantity;
        await this.orderDetailsRepository.save(orderDetailsExists);
      } else {
        orderDetails = new OrderDetails();
        orderDetails.order = orderExists;
        orderDetails.productId = +data.productId;
        orderDetails.quantity = data.quantity;
        await this.orderDetailsRepository.save(orderDetails);
      }
    }
  }

  public async clearOrderList(accountId: number): Promise<void> {
    await this.orderListRepository.delete({ accountId });
  }

  public async editOrder(data: IOrderListDto): Promise<void> {
    const orderDetails: IOrderDetailsPostgres = await this.orderDetailsRepository.findOne({
      where: {
        productId: +data.productId,
        order: { accountId: +data.accountId },
      },
      relations: ['order'],
    });
    if (data.quantity === 0) {
      await this.orderDetailsRepository.remove(orderDetails);
    } else {
      orderDetails.quantity = data.quantity;
      await this.orderDetailsRepository.save(orderDetails);
    }
  }
}
