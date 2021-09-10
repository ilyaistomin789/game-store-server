import App from './app';
import ProductController from './controllers/product.controller';
import { run } from './db/';

run();
const app = new App({
  port: 3000,
  controllers: [new ProductController('/products')],
});

app.listen();
