import { Router } from 'express';

export default interface ControllerI {
  path: string;
  router: Router;

  initRoutes(): void;
}
