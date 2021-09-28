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
  @ManyToMany((type) => Category, (category) => category.products, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable()
  categories: Category[];

  @OneToMany(() => UserRatings, (userRatings) => userRatings.product, {
    cascade: true,
  })
  userRatings!: UserRatings[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
