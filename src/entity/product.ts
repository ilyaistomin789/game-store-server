import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IProductPostgres } from '../db/interfaces/product.interface';
import Category from './category';

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

  @OneToOne((type) => Category)
  @JoinColumn()
  category: Category;
}
