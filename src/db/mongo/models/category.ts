import { ICategoryMongo } from '../../interfaces/category.interface';
import { prop, Ref, ModelOptions } from '@typegoose/typegoose';
import Product from './product';

@ModelOptions({ schemaOptions: { timestamps: true } })
export default class Category implements ICategoryMongo {
  @prop({ required: true })
  public displayName: string;
  @prop({ ref: () => Product })
  public products: Ref<Product>[];
}
