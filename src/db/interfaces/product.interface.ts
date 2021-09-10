import { Document, Schema } from 'mongoose';

export default interface IProduct {
  id?: number;
  _id?: Schema.Types.ObjectId;
  displayName: string;
  categoryId: number | Schema.Types.ObjectId;
  totalRating: number;
  price: number;
}

export interface IProductMongo extends Document {
  displayName: string;
  categoryId: Schema.Types.ObjectId;
  totalRating: number;
  price: number;
}

export interface IProductPostgres {
  id: number;
  displayName: string;
  categoryId: number;
  totalRating: number;
  price: number;
}
