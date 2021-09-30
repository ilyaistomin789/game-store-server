import { ILastRatingsRepository } from '../interfaces/lastRatingsRepository.interface';
import { ILastRatingsDto, ILastRatingsOutput, ILastRatingsPostgres } from '../interfaces/lastRatings.interface';
import LastRatings from '../postgres/entity/lastRatings';
import { getConnectionManager } from 'typeorm';

interface ILastRatingsValues {
  comments?: string;
  product: { displayName: string };
  rating: number;
  updatedAt: Date;
}

export default class LastRatingsTypeOrmRepository implements ILastRatingsRepository {
  private manager = getConnectionManager().get('default');
  private lastRatingsRepository = this.manager.getRepository<ILastRatingsPostgres>(LastRatings);
  public async addLastRating(data: ILastRatingsDto): Promise<void> {
    const lastRatings = new LastRatings();
    lastRatings.comments = data.comments ? data.comments : null;
    lastRatings.product = +data.product;
    lastRatings.rating = data.rating;
    await this.lastRatingsRepository.save(lastRatings);
  }

  public async getLastRatings(): Promise<ILastRatingsOutput[]> {
    const lastRatings = await this.lastRatingsRepository
      .createQueryBuilder('last_ratings')
      .innerJoinAndSelect('last_ratings.product', 'product')
      .select('product.displayName')
      .addSelect(['last_ratings.rating', 'last_ratings.comments', 'last_ratings.updatedAt'])
      .limit(10)
      .addOrderBy('last_ratings.updatedAt', 'DESC')
      .getMany();
    const lastRatingsOutput: ILastRatingsOutput[] = [];
    // @ts-ignore
    lastRatings.forEach(({ comments, product: { displayName }, rating }) =>
      lastRatingsOutput.push({
        productName: displayName,
        rating: rating,
        comments: comments,
      })
    );
    return lastRatingsOutput;
  }
  public async cleanLastRatings(): Promise<void> {
    await this.lastRatingsRepository.delete({});
  }
}
