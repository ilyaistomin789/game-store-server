"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const product_controller_1 = __importDefault(require("./controllers/product.controller"));
const connection_1 = require("./connection");
const app = new app_1.default({
    port: 3000,
    controllers: [new product_controller_1.default('/products')],
});
(0, connection_1.run)();
app.listen();
