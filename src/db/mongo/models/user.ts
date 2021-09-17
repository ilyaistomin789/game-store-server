import { IUserMongo } from '../../interfaces/user.interface';
import { Schema } from 'mongoose';
import { ModelOptions, prop } from '@typegoose/typegoose';

@ModelOptions({ schemaOptions: { timestamps: true } })
export default class User implements IUserMongo {
  @prop()
  _id: Schema.Types.ObjectId;
  @prop()
  username: string;
  @prop()
  firstName: string;
  @prop()
  lastName: string;
  @prop()
  password: string;
  @prop()
  role: string;
}
