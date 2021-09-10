import { Schema, model } from 'mongoose';
import ICategory from '../../interfaces/category.interface';

const schema = new Schema<ICategory>(
  {
    displayName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ICategory>('Category', schema);
