import { IProductMongo } from '../../interfaces/product.interface';
import { prop, Ref, ModelOptions } from '@typegoose/typegoose';
import Category from './category';

@ModelOptions({ schemaOptions: { timestamps: true } })
export default class Product implements IProductMongo {
  @prop({ ref: () => Category })
  public categories: Ref<Category>[];
  @prop()
  public displayName: string;
  @prop()
  public price: number;
  @prop()
  public totalRating: number;
}
