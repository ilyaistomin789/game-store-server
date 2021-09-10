import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import IProduct from '../db/interfaces/product.interface';
import Category from './category';

@Entity()
export default class Product implements IProduct {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text')
  displayName: string;

  @Column('double')
  price: number;

  @Column()
  totalRating: number;

  @OneToOne((type) => Category)
  @JoinColumn()
  category: Category;
}
