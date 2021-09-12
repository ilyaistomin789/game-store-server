import { Schema } from 'mongoose';

export interface ICategory {
  _id?: Schema.Types.ObjectId;
  id?: number;
  displayName: string;
}

export interface ICategoryMongo {
  _id?: Schema.Types.ObjectId;
  displayName: string;
}
export interface ICategoryPostgre {
  id: number;
  displayName: string;
}
