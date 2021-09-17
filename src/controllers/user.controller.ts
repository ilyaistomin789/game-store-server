import IController from '../types/controller';
import { Router } from 'express';

export default class UserController implements IController {
  path: string;
  router: Router;
  constructor(path: string) {
    this.path = path;
    this.initRoutes();
  }
  public initRoutes(): void {}
}
