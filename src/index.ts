import App from './app';
import ProductController from './controllers/product.controller';
import { run } from './db/';
import CategoryController from './controllers/category.controller';
import AuthController from './controllers/auth.controller';
import AccountController from './controllers/account.controller';

run();
const app = new App({
  port: 3000,
  controllers: [
    new ProductController('/products'),
    new CategoryController('/categories'),
    new AuthController(),
    new AccountController('/profile'),
  ],
});

app.listen();
