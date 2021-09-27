import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IProductPostgres } from '../../interfaces/product.interface';
import Category from './category';
import UserRatings from './userRatings';

@Entity()
export default class Product implements IProductPostgres {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  displayName: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @Column()
  totalRating: number;
  //TODO check product deleting in typeorm
  @ManyToMany((type) => Category, (category) => category.products, {
    onUpdate: 'CASCADE', // query log shows "ON UPDATE NO ACTION" no matter the value
    onDelete: 'CASCADE', // property is correctly picked up
  })
  @JoinTable()
  categories: Category[];

  @OneToMany(() => UserRatings, (userRatings) => userRatings.product)
  userRatings!: UserRatings[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
