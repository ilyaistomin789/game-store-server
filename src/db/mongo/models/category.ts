import { ICategoryMongo } from '../../interfaces/category.interface';
import { prop } from '@typegoose/typegoose';

export default class Category implements ICategoryMongo {
  @prop({ required: true })
  public displayName: string;
}
