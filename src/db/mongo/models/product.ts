import { Schema, model } from 'mongoose';
import IProduct from '../../interfaces/product.interface';
import { prop } from '@typegoose/typegoose';
import Category from './category';

export default class Product implements IProduct {
  @prop({ ref: () => Category })
  public categoryId: string;
  @prop()
  public displayName: string;
  @prop()
  public price: number;
  @prop()
  public totalRating: number;
}
