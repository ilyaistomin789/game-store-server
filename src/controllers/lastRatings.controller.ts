import IController from '../types/controller';
import { Router } from 'express';
import GetLastRatingsService from '../services/lastRatings/getLastRatingsService';

export default class LastRatingsController implements IController {
  path: string;
  router: Router;
  constructor(path: string) {
    this.path = path;
    this.router = Router();
    this.initRoutes();
  }
  initRoutes(): void {
    this.router.get(this.path, GetLastRatingsService);
  }
}
