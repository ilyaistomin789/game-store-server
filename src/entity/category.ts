import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import ICategory from '../db/interfaces/category.interface';

@Entity()
export default class Category implements ICategory {
  @PrimaryGeneratedColumn()
  id: string;
  @Column('text')
  displayName: string;
}
