import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IOrderListPostgres } from '../../interfaces/orderList.interface';
import OrderDetails from './orderDetails';

@Entity()
export default class OrderList implements IOrderListPostgres {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  accountId: number;
  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order, {
    cascade: true,
  })
  orderDetails: OrderDetails[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
