import { ILastRatingsRepository } from '../interfaces/lastRatingsRepository.interface';
import { ILastRatingsDto, ILastRatingsOutput, ILastRatingsPostgres } from '../interfaces/lastRatings.interface';
import LastRatings from '../postgres/entity/lastRatings';
import { getConnectionManager } from 'typeorm';

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
    let lastRatings = await this.lastRatingsRepository
      .createQueryBuilder('last_ratings')
      .innerJoinAndSelect('last_ratings.product', 'product')
      .select('product.displayName')
      .addSelect(['last_ratings.rating', 'last_ratings.comments', 'last_ratings.updatedAt'])
      .limit(10)
      .addOrderBy('last_ratings.updatedAt', 'DESC')
      .getMany();

    return lastRatings.map((lastRating) => ({
      // @ts-ignore
      productName: lastRating.product.displayName,
      rating: lastRating.rating,
      comments: lastRating.comments,
    }));
  }
  public async cleanLastRatings(): Promise<void> {
    await this.lastRatingsRepository.delete({});
  }
}
