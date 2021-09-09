import { Schema, Document, model, Types } from 'mongoose';

export interface ProductI extends Document {
  displayName: string;
  categoryId: Types.ObjectId;
  totalRating: number;
  price: number;
}

const schema = new Schema<ProductI>(
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

export default model<ProductI>('Product', schema);
