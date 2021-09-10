import { Schema, model } from 'mongoose';
import IProduct from '../../interfaces/product.interface';

const schema = new Schema<IProduct<Schema.Types.ObjectId>>(
  {
    displayName: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    totalRating: {
      type: Schema.Types.Number,
    },
    price: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IProduct<Schema.Types.ObjectId>>('Product', schema);
