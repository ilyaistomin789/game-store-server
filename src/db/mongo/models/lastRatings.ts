import { ModelOptions, prop, Ref } from '@typegoose/typegoose';
import { ILastRatingsMongo } from '../../interfaces/lastRatings.interface';
import Account from './account';
import Product from './product';

@ModelOptions({ schemaOptions: { timestamps: true } })
export default class LastRatings implements ILastRatingsMongo {
  @prop({ ref: () => Product })
  product: Ref<Product>;
  @prop()
  rating: number;
  @prop()
  comments: string | null;
}
