import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ICategoryPostgre } from '../../interfaces/category.interface';
import Product from './product';

@Entity()
export default class Category implements ICategoryPostgre {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  displayName: string;
  @ManyToMany((type) => Product, (product) => product.categories, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  products: Product[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
