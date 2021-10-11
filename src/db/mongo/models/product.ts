import { IProductMongo } from '../../interfaces/product.interface';
import { prop, Ref, ModelOptions, Severity } from '@typegoose/typegoose';
import Category from './category';
import { IUserRatingsMongo } from '../../interfaces/userRatings.interface';
import UserRatings from './userRatings';
import { Schema } from 'mongoose';

@ModelOptions({ schemaOptions: { timestamps: true }, options: { allowMixed: Severity.ALLOW } })
export default class Product implements IProductMongo {
  @prop({ ref: () => Category })
  public categories: Ref<Category>[];
  @prop()
  public displayName: string;
  @prop()
  public price: number;
  @prop()
  public totalRating: number;
  @prop()
  public ratings?: UserRatings[];
}
