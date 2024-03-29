import App from './app';
import ProductController from './controllers/product.controller';
import { run } from './db/';
import CategoryController from './controllers/category.controller';
import AuthController from './controllers/auth.controller';
import AccountController from './controllers/account.controller';
import UserRatingsController from './controllers/userRatings.controller';
import { IAccount } from './db/interfaces/account.interface';
import OrderListController from './controllers/orderList.controller';
import LastRatingsController from './controllers/lastRatings.controller';
import CronJob from './cron';
declare namespace Express {
  export interface Request {
    user: IAccount;
  }
  export interface Response {
    user: IAccount;
  }
}
const cron = new CronJob();

run();
const app = new App({
  port: +process.env.PORT || 3000,
  controllers: [
    new ProductController('/products'),
    new CategoryController('/categories'),
    new AuthController(),
    new AccountController('/profile'),
    new UserRatingsController(),
    new OrderListController('/order-list'),
    new LastRatingsController('/lastRatings'),
  ],
});
cron.cleanLastRatings();
app.listen();
