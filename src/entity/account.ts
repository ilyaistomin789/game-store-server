import { IAccountPostgres } from '../db/interfaces/account.interface';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}