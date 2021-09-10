import IProductRepository from '../interfaces/productRepository.interface';
import IProduct from '../interfaces/product.interface';
import { Request, Response } from 'express';
import { Schema } from 'mongoose';
import { DataTypes } from 'sequelize';
import ProductMongo from '../mongo/models/product';
import ProductPostgre from '../postgre/models/product';
type Type = Schema.Types.ObjectId | number;

export default class ProductRepository implements IProductRepository<IProduct> {
  constructor() {} // TODO realize CRUD

  create(req: Request, res: Response): void {}

  delete(req: Request, res: Response): void {}

  read(req: Request, res: Response): IProduct {}

  update(req: Request, res: Response): void {}
}
