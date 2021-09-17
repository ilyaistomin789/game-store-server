import { IUserPostgres } from '../db/interfaces/user.interface';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export default class User implements IUserPostgres {
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
