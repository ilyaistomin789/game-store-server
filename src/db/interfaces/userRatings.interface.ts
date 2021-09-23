import { Schema } from 'mongoose';

export interface IUserRatings {
  product: Schema.Types.ObjectId | number;
  account?: Schema.Types.ObjectId | number;
  rating: number;
  comments?: string | null;
  role?: string;
}

export interface IUserRatingsMongo {
  account: Schema.Types.ObjectId;
  rating: number;
  comments?: string | null;
}
export interface IUserRatingsPostgres {
  product: number;
  account?: number;
  rating: number;
  comments?: string | null;
  role?: string;
}

export interface IUserRatingsDto {
  product: string;
  rating: number;
  comments: string | null;
  account: string;
  role: string;
}
