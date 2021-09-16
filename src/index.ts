import App from './app';
import ProductController from './controllers/product.controller';
import { run } from './db/';
import CategoryController from './controllers/category.controller';

run();
const app = new App({
  port: 3000,
  controllers: [new ProductController('/products'), new CategoryController('/categories')],
});

app.listen();
