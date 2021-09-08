import { Schema, model, Types, Document } from 'mongoose';

interface CategoryI extends Document {
    displayName: string;
}

const schema = new Schema<CategoryI>({
    displayName: {
        type: String,
        required: true
    }
}, {timestamps: true});

export default model<CategoryI>('Category', schema);