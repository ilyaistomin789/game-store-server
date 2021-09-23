import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Account from './account';
import Product from './product';

@Entity()
export default class UserRatings {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Account, (account) => account.id)
  account: number;
  @ManyToOne(() => Product, (product) => product.id)
  product: number;
  @Column()
  rating: number;
  @Column({
    type: 'text',
    nullable: true,
  })
  comments!: string;
}
