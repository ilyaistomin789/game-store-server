import { ILastRatingsRepository } from '../interfaces/lastRatingsRepository.interface';
import {
  ILastRatings,
  ILastRatingsDto,
  ILastRatingsMongo,
  ILastRatingsOutput,
} from '../interfaces/lastRatings.interface';
import { getModelForClass } from '@typegoose/typegoose';
import LastRatings from '../mongo/models/lastRatings';
import Product from '../mongo/models/product';

export default class LastRatingsTypegooseRepository implements ILastRatingsRepository {
  private lastRatingsModel = getModelForClass(LastRatings);
  private productModel = getModelForClass(Product);
  public async addLastRating(data: ILastRatingsDto): Promise<void> {
    await this.lastRatingsModel.create({
      product: data.product,
      rating: data.rating,
      comments: data.comments ? data.comments : null,
    });
  }

  public async getLastRatings(): Promise<ILastRatingsOutput[]> {
    const lastRatings: ILastRatingsMongo[] = await this.lastRatingsModel.find().limit(10).sort({ updatedAt: -1 }),
      lastRatingsOutput: ILastRatingsOutput[] = [];
    for (const lastRating of lastRatings) {
      const productName: { displayName: string } = await this.productModel
        .findById(lastRating.product)
        .select({ displayName: 1, _id: 0 });
      lastRatingsOutput.push({
        productName: productName.displayName,
        rating: lastRating.rating,
        comments: lastRating.comments,
      });
    }
    return lastRatingsOutput;
  }
  public async cleanLastRatings(): Promise<void> {
    await this.lastRatingsModel.remove({});
  }
}
