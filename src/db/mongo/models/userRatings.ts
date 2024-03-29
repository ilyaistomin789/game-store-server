import { ModelOptions, prop, Ref } from '@typegoose/typegoose';
import Category from './category';
import { IUserRatingsMongo } from '../../interfaces/userRatings.interface';
import { Model, Schema } from 'mongoose';

@ModelOptions({ schemaOptions: { timestamps: true } })
export default class UserRatings implements IUserRatingsMongo {
  @prop()
  account: Schema.Types.ObjectId;
  @prop()
  rating: number;
  @prop()
  comments: string | null;
}
