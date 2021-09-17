import { Schema } from 'mongoose';

export interface IUser {
  id?: number;
  _id?: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface IUserPostgres {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface IUserMongo {
  _id?: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: string;
  updatedAt?: Date;
  createdAt?: Date;
}
