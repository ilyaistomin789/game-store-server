import { Response, Request, NextFunction } from 'express';
import { LastRatingsRepository } from '../../db';

const getLastRatingsService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lastRatings = await LastRatingsRepository.getLastRatings();
    res.json(lastRatings);
  } catch (e) {
    res.status(404);
    next(e);
  }
};

export default getLastRatingsService;
