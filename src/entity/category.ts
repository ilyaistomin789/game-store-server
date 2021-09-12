import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ICategoryPostgre } from '../db/interfaces/category.interface';

@Entity()
export default class Category implements ICategoryPostgre {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  displayName: string;
}
