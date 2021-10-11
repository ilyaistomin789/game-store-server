import { Schema } from 'mongoose';
import ProductPostgre from '../postgres/entity/product';
import ProductMongo from '../mongo/models/product';
import { Ref } from '@typegoose/typegoose';
export interface ICategory {
  _id?: Schema.Types.ObjectId;
  id?: number;
  displayName: string;
  products?: ProductPostgre[] | Ref<ProductMongo>[];
  updatedAt?: Date;
  createdAt?: Date;
}

export interface ICategoryMongo {
  _id?: Schema.Types.ObjectId;
  displayName: string;
  products?: Ref<ProductMongo>[];
  updatedAt?: Date;
  createdAt?: Date;
}
export interface ICategoryPostgre {
  id: number;
  displayName: string;
  products: ProductPostgre[];
  updatedAt: Date;
  createdAt: Date;
}
