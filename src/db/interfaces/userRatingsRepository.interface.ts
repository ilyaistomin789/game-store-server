import { IUserRatingsDto } from './userRatings.interface';

export interface IUserRatingsRepository {
  addUserRating(data: IUserRatingsDto): Promise<void>;
}
