import IController from '../types/controller';
import { Router } from 'express';
import passport from 'passport';
import RegisterAccountService from '../services/account/registerAccountService';
import UpdateAccountService from '../services/account/updateAccountService';
import UpdatePasswordService from '../services/account/updatePasswordService';
import checkPasswordMiddleware from '../middlewares/checkPasswordMiddleware';

export default class AccountController implements IController {
  path: string;
  router: Router;
  constructor(path: string) {
    this.path = path;
    this.router = Router();
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post('/register', RegisterAccountService);
    this.router.put(this.path, passport.authenticate('jwt', { session: false }), UpdateAccountService);
    this.router.post(
      `${this.path}/password`,
      passport.authenticate('jwt', { session: false }),
      checkPasswordMiddleware,
      UpdatePasswordService
    );
  }
}
