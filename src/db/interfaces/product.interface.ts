import { Schema } from 'mongoose';
import { Ref } from '@typegoose/typegoose';
import CategoryPostgres from '../../entity/category';
import CategoryMongo from '../mongo/models/category';

export interface IProduct {
  id?: number;
  _id?: Schema.Types.ObjectId;
  displayName: string;
  category?: CategoryPostgres | CategoryMongo;
  totalRating: number;
  price: number;
}

export interface IProductMongo {
  _id?: Schema.Types.ObjectId;
  category: Ref<CategoryMongo>;
  displayName: string;
  totalRating: number;
  price: number;
}
export interface IProductPostgres {
  id?: number;
  displayName: string;
  category?: CategoryPostgres;
  totalRating: number;
  price: number;
}
