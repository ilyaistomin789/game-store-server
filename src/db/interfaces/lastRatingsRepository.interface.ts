import { ILastRatingsDto, ILastRatingsOutput } from './lastRatings.interface';

export interface ILastRatingsRepository {
  getLastRatings(): Promise<ILastRatingsOutput[]>;
  addLastRating(data: ILastRatingsDto): Promise<void>;
  cleanLastRatings(): Promise<void>;
}
