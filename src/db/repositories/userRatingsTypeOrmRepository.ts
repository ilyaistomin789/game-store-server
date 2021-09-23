import { IUserRatingsRepository } from '../interfaces/userRatingsRepository.interface';
import { IUserRatingsDto, IUserRatingsPostgres } from '../interfaces/userRatings.interface';
import { getConnectionManager } from 'typeorm';
import { IProductPostgres } from '../interfaces/product.interface';
import Product from '../postgres/entity/product';
import { AccountRepository } from '../index';
import UserRatings from '../postgres/entity/userRatings';

export default class UserRatingsTypeOrmRepository implements IUserRatingsRepository {
  private manager = getConnectionManager().get('default');
  private productRepository = this.manager.getRepository<IProductPostgres>(Product);
  private userRatingsRepository = this.manager.getRepository<IUserRatingsPostgres>(UserRatings);
  public async addUserRating(data: IUserRatingsDto): Promise<void> {
    const userRatingExists = await this.userRatingsRepository.findOne({
      account: +data.account,
      product: +data.product,
    });
    if (!userRatingExists) {
      const userRatings = new UserRatings();
      userRatings.product = +data.product;
      userRatings.account = +data.account;
      userRatings.rating = data.rating;
      userRatings.comments = data.comments ? data.comments : null;
      await this.userRatingsRepository.save(userRatings);
    } else {
      userRatingExists.rating = data.rating;
      userRatingExists.comments = data.comments ? data.comments : null;
      await this.userRatingsRepository.save(userRatingExists);
    }
    const { ratingsCount, ratingsSum } = await this.userRatingsRepository
      .createQueryBuilder('user_ratings')
      .select('COUNT(*)', 'ratingsCount')
      .addSelect('SUM(user_ratings.rating)', 'ratingsSum')
      .where('user_ratings.productId=:productId', { productId: data.product })
      .getRawOne();
    const currentProduct = await this.productRepository.findOne(data.product);
    currentProduct.totalRating = ratingsSum / ratingsCount;
    await this.productRepository.save(currentProduct);
  }
}
