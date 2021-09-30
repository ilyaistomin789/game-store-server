import { Schema } from 'mongoose';
import { Ref } from '@typegoose/typegoose';
import Product from '../mongo/models/product';

export interface ILastRatings {
  _id?: Schema.Types.ObjectId;
  id?: number;
  product: Ref<Product> | number;
  rating: number;
  comments?: string;
}
export interface ILastRatingsMongo {
  _id?: Schema.Types.ObjectId;
  product: Ref<Product>;
  rating: number;
  comments?: string;
  productName?: string;
}

export interface ILastRatingsPostgres {
  id: number;
  product: number;
  rating: number;
  comments?: string;
}

export interface ILastRatingsDto {
  product: string;
  rating: number;
  comments?: string;
}
export interface ILastRatingsOutput {
  productName: string;
  rating: number;
  comments?: string;
}
