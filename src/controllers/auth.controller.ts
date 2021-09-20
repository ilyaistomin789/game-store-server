import IController from '../types/controller';
import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import AuthenticateService from '../services/auth/authenticateService';
import RefreshTokenService from '../services/auth/refreshTokenService';

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
      (req: Request, res: Response, next: NextFunction) => {
        const { username, role } = req.body;
        const tokens = AuthenticateService(next, { username, role });
        res.json(tokens);
      }
    );
    this.router.post('/token', RefreshTokenService);
  }
}
