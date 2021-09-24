import IController from '../types/controller';
import { Router } from 'express';
import AddOrderService from '../services/orderList/addOrderService';
import EditOrderService from '../services/orderList/editOrderService';
import CleanOrderListService from '../services/orderList/cleanOrderListService';
import passport from 'passport';
export default class OrderListController implements IController {
  path: string;
  router: Router;
  constructor(path: string) {
    this.path = path;
    this.router = Router();
    this.initRoutes();
  }
  initRoutes(): void {
    this.router.post(this.path, passport.authenticate('jwt', { session: false }), AddOrderService);
    this.router.put(this.path, passport.authenticate('jwt', { session: false }), EditOrderService);
    this.router.post(`${this.path}/clear`, passport.authenticate('jwt', { session: false }), CleanOrderListService);
  }
}
