import { IProductMongo } from '../../interfaces/product.interface';
import { prop, Ref } from '@typegoose/typegoose';
import Category from './category';

export default class Product implements IProductMongo {
  @prop({ ref: () => Category })
  public category: Ref<Category>;
  @prop()
  public displayName: string;
  @prop()
  public price: number;
  @prop()
  public totalRating: number;
}
