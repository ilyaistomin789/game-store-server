import { Schema, model } from 'mongoose';
import ICategory from '../../interfaces/category.interface';
import { prop } from '@typegoose/typegoose';

export default class Category implements ICategory {
  @prop({ required: true })
  public displayName: string;
}
