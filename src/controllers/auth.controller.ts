import IController from '../types/controller';
import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import AuthenticateService from '../services/auth/authenticateService';
import RefreshTokenService from '../services/auth/refreshTokenService';
import { AccountRepository } from '../db';

export default class AuthController implements IController {
  router: Router;

  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post(
      '/authenticate',
      passport.authenticate('local', { session: false }),
      async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.body;
        const tokens = AuthenticateService(next, username);
        res.json(tokens);
      }
    );
    this.router.post('/token', RefreshTokenService);
  }
}
