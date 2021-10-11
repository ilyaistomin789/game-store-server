import { IUserRatingsRepository } from '../interfaces/userRatingsRepository.interface';
import { IUserRatingsDto } from '../interfaces/userRatings.interface';
import { getModelForClass } from '@typegoose/typegoose';
import Product from '../mongo/models/product';
import { IProductMongo } from '../interfaces/product.interface';
import { ObjectId } from 'mongodb';
import { sendLastRatings } from '../../utils/socket-io';
import { LastRatingsRepository } from '../index';

export default class UserRatingsTypegooseRepository implements IUserRatingsRepository {
  private productModel = getModelForClass(Product);
  public async addUserRating(data: IUserRatingsDto): Promise<void> {
    const product = <IProductMongo> await this.productModel.findById(data.product);
    if (!product) {
      throw new Error('Incorrect product');
    }
    const userRatingsExists = product.ratings.some((rating) => `${rating.account}` === data.account);
    if (!userRatingsExists) {
      product.ratings.push({
        account: ObjectId(data.account),
        rating: data.rating,
        comments: data.comments,
      });
    } else {
      const index = product.ratings.findIndex((rating) => `${rating.account}` === data.account);
      product.ratings[index].rating = data.rating;
      product.ratings[index].comments = data.comments;
    }
    const sum: number = product.ratings.reduce((accum, currentValue) => accum + currentValue.rating, 0);
    product.totalRating = sum / product.ratings.length;

    await this.productModel.findOneAndUpdate(
      { _id: product._id },
      { $set: { totalRating: product.totalRating, ratings: product.ratings } }
    );
    await LastRatingsRepository.addLastRating({ product: data.product, rating: data.rating, comments: data.comments });
    sendLastRatings(JSON.stringify(await LastRatingsRepository.getLastRatings()));
  }
}
