import App from './app';
import ProductController from './db/controllers/product.controller';
import { run } from './connection';

const app = new App({
    port: 3000,
    controllers: [
        new ProductController()
    ]
});

run();
app.listen();