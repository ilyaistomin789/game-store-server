import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ILastRatingsPostgres } from '../../interfaces/lastRatings.interface';
import Account from './account';
import Product from './product';

@Entity()
export default class LastRatings implements ILastRatingsPostgres {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Product, (product) => product.id, {
    onDelete: 'CASCADE',
  })
  product: number;
  @Column()
  rating: number;
  @Column({
    type: 'text',
    nullable: true,
  })
  comments!: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
