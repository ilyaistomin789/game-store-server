import { Schema } from 'mongoose';
import { Ref } from '@typegoose/typegoose';
import CategoryPostgres from '../../entity/category';
import CategoryMongo from '../mongo/models/category';

export interface IProduct {
  id?: number;
  _id?: Schema.Types.ObjectId;
  displayName: string;
  categories?: CategoryPostgres[] | Ref<CategoryMongo>[];
  totalRating: number;
  price: number;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IProductMongo {
  _id?: Schema.Types.ObjectId;
  categories: Ref<CategoryMongo>[];
  displayName: string;
  totalRating: number;
  price: number;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface IProductPostgres {
  id?: number;
  displayName: string;
  categories?: CategoryPostgres[];
  totalRating: number;
  price: number;
  updatedAt: Date;
  createdAt: Date;
}
