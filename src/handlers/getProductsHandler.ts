import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import ProductPostgres from '../entity/product';
import ProductMongo from '../db/mongo/models/product';
import { ProductRepository } from '../db';
import { IProduct, IProductMongo } from '../db/interfaces/product.interface';
import { getModelForClass } from '@typegoose/typegoose';
import { Query } from 'mongoose';

let products: IProduct[];

export const productsMongoHandler = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const productModel = getModelForClass(ProductMongo);
  let sortByValues: string[];
  const query: Query<ProductMongo, IProductMongo> = new Query<ProductMongo, IProductMongo>();
  const { displayName, minRating, price, sortBy, limit, page } = request.query;
  const andArray = [];
  if (displayName) {
    andArray.push({ displayName: { $regex: `.*${displayName}.*` } });
  }
  if (minRating) {
    if (isNaN(+minRating)) throw new Error('Wrong minRating value');
    andArray.push({ totalRating: { $gt: +minRating } });
  }
  if (price) {
    if (!new RegExp('[0-9]*:[0-9]+').test(`${price}`)) throw new Error('Wrong price value');
    const priceValues: string[] = `${price}`.split(':');
    if (priceValues[0] && priceValues[1]) {
      andArray.push({ price: { $gt: +priceValues[0], $lt: +priceValues[1] } });
    }
    if (!priceValues[0] && priceValues[1]) {
      andArray.push({ price: { $lt: +priceValues[1] } });
    }
  }
  andArray.length && query.and(andArray);
  if (sortBy) {
    if (!new RegExp('([a-zA-z]+)(:)(asc|desc)').test(`${sortBy}`)) throw new Error('Wrong sortBy value');
    sortByValues = `${sortBy}`.split(':');
    query.sort({ [`${sortByValues[0]}`]: sortByValues[1] });
  }
  if (limit && page) {
    if (isNaN(+limit) || isNaN(+page)) throw new Error('Wrong limit or page value');
    const skip: number = (+page - 1) * +limit;
    query.skip(skip);
    query.limit(+limit);
  } else if (limit && !page) {
    if (isNaN(+limit)) throw new Error('Wrong limit value');
    query.limit(+limit);
  }

  if (!displayName && !minRating && !price && !sortBy && !page && !limit) {
    products = await ProductRepository.getProduct();
    sendResponse(products, response, next);
  } else {
    products = await productModel.find(query).exec();
    sendResponse(products, response, next);
  }
};

export const productsPostgresHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const query = getRepository(ProductPostgres).createQueryBuilder('product');
  const { displayName, minRating, price, sortBy, limit, page } = request.query;
  query.where({});
  if (displayName) {
    query.andWhere('product.displayName LIKE :searchString', { searchString: `%${displayName}%` });
  }
  if (minRating) {
    if (isNaN(+minRating)) throw new Error('Wrong minRating value');
    query.andWhere('product.totalRating > :value', { value: +minRating });
  }
  if (price) {
    if (!new RegExp('[0-9]*:[0-9]+').test(`${price}`)) throw new Error('Wrong price value');
    const priceValues: string[] = `${price}`.split(':');
    if (priceValues[0] && priceValues[1]) {
      query.andWhere('product.price BETWEEN :min AND :max', { min: +priceValues[0], max: +priceValues[1] });
    } else if (!priceValues[0] && priceValues[1]) {
      query.andWhere('product.price < :max', { max: +priceValues[1] });
    }
  }
  if (sortBy) {
    if (!new RegExp('([a-zA-z]+)(:)(asc|desc)').test(`${sortBy}`)) throw new Error('Wrong sortBy value');
    const sortByValues: string[] = `${sortBy}`.split(':');
    query.addOrderBy(sortByValues[0], sortByValues[1].toUpperCase() as 'ASC' | 'DESC');
  }
  if (limit && page) {
    if (isNaN(+limit) || isNaN(+page)) throw new Error('Wrong limit or page value');
    const skip: number = (+page - 1) * +limit;
    query.skip(skip);
    query.take(+limit);
  } else if (limit && !page) {
    if (isNaN(+limit)) throw new Error('Wrong limit value');
    query.take(+limit);
  }
  if (!displayName && !minRating && !price && !sortBy && !page && !limit) {
    products = await ProductRepository.getProduct();
    sendResponse(products, response, next);
  } else {
    products = await query.getMany();
    sendResponse(products, response, next);
  }
};

const sendResponse = (products: IProduct[], response: Response, next: NextFunction): void => {
  if (Object.keys(products).length !== 0) {
    response.send(products);
  } else {
    response.status(404);
    next(new Error('Products not found'));
  }
};
