import { IAccountPostgres } from '../../interfaces/account.interface';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import UserRatings from './userRatings';

@Entity()
export default class Account implements IAccountPostgres {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  firstName: string;
  @Column('text')
  lastName: string;
  @Column('text')
  username: string;
  @Column('text')
  password: string;
  @Column('text')
  role: string;
  @OneToMany(() => UserRatings, (userRatings) => userRatings.account)
  userRatings!: UserRatings[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
