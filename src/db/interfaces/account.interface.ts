import { Schema } from 'mongoose';

export interface IAccount {
  id?: number;
  _id?: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role?: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface IAccountPostgres {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role?: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface IAccountMongo {
  _id?: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role?: string;
  updatedAt?: Date;
  createdAt?: Date;
}
