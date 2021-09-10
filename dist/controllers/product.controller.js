"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getProductService_1 = __importDefault(require("../services/product/getProductService"));
class ProductController {
    constructor(path) {
        this.router = express_1.default.Router();
        this.path = path;
        this.initRoutes();
    }
    initRoutes() {
        this.router.get(this.path, getProductService_1.default);
    }
}
exports.default = ProductController;
