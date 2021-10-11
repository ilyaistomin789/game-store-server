import IController from '../types/controller';
import { Router } from 'express';
import AddRatingForProductService from '../services/userRatings/addRatingForProductService';
import passport from 'passport';
import checkRolesMiddleware from '../middlewares/checkRolesMiddleware';
export default class UserRatingsController implements IController {
  router: Router;
  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      '/products/:id/rate',
      passport.authenticate('jwt', { session: false }),
      checkRolesMiddleware(['buyer']),
      AddRatingForProductService
    );
  }
}
