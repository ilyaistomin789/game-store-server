import cron from 'node-cron';
import { LastRatingsRepository } from '../db';

export default class CronJob {
  public cleanLastRatings() {
    cron.schedule('0 0 * * 1', async () => {
      await LastRatingsRepository.cleanLastRatings();
    });
  }
}
