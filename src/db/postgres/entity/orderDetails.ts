import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IOrderListPostgres } from '../../interfaces/orderList.interface';
import { IOrderDetailsPostgres } from '../../interfaces/orderDetails.interface';
import OrderList from './orderList';

@Entity()
export default class OrderDetails implements IOrderDetailsPostgres {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => OrderList, (orderList) => orderList.id, {
    onDelete: 'CASCADE',
  })
  order: OrderList;
  @Column()
  productId: number;
  @Column()
  quantity: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
