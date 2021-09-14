import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ProductPostgres from '../entity/product';
import ProductMongo from '../db/mongo/models/product';
import { ProductRepository } from '../db';
import { IProduct, IProductMongo } from '../db/interfaces/product.interface';
import { getModelForClass } from '@typegoose/typegoose';
import { Query } from 'mongoose';

let products: IProduct[];

export const productsMongoHandler = async (request: Request, response: Response): Promise<void> => {
  const productModel = getModelForClass(ProductMongo);
  let sortByValues: string[];
  const query: Query<ProductMongo, IProductMongo> = new Query<ProductMongo, IProductMongo>();
  const { displayName, minRating, price, sortBy } = request.query;
  const andArray = [];
  if (displayName) {
    andArray.push({ displayName: { $regex: `.*${displayName}.*` } });
  }
  if (minRating) {
    andArray.push({ totalRating: { $gt: +minRating } });
  }
  if (price) {
    const priceValues: string[] = `${price}`.split(':');
    if (priceValues[0] && priceValues[1]) {
      andArray.push({ price: { $gt: +priceValues[0], $lt: +priceValues[1] } });
    }
    if (!priceValues[0] && priceValues[1]) {
      andArray.push({ price: { $lt: +priceValues[1] } });
    }
  }
  query.and(andArray);
  if (sortBy) {
    sortByValues = `${sortBy}`.split(':');
  }
  if (!displayName && !minRating && !price && !sortBy) {
    products = await ProductRepository.getProduct();
    sendResponse(products, response);
  } else {
    products = await productModel
      .find(query)
      .sort(sortByValues ? { [`${sortByValues[0]}`]: sortByValues[1] } : 'ASC')
      .exec();
    sendResponse(products, response);
  }
};

export const productsPostgresHandler = async (request: Request, response: Response): Promise<void> => {
  const query = getRepository(ProductPostgres).createQueryBuilder('product');
  const { displayName, minRating, price, sortBy } = request.query;
  query.where({});
  if (displayName) {
    query.andWhere('product.displayName LIKE :searchString', { searchString: `%${displayName}%` });
  }
  if (minRating) {
    query.andWhere('product.totalRating > :value', { value: minRating });
  }
  if (price) {
    const priceValues: string[] = `${price}`.split(':');
    if (priceValues[0] && priceValues[1]) {
      query.andWhere('product.price BETWEEN :min AND :max', { min: +priceValues[0], max: +priceValues[1] });
    } else if (!priceValues[0] && priceValues[1]) {
      query.andWhere('product.price < :max', { max: +priceValues[1] });
    }
  }
  if (sortBy) {
    const sortByValues: string[] = `${sortBy}`.split(':');
    query.addOrderBy(sortByValues[0], sortByValues[1].toUpperCase() as 'ASC' | 'DESC');
  }
  if (!displayName && !minRating && !price && !sortBy) {
    products = await ProductRepository.getProduct();
    sendResponse(products, response);
  } else {
    products = await query.getMany();
    sendResponse(products, response);
  }
};

const sendResponse = (products: IProduct[], response: Response): void => {
  if (products !== null) {
    response.send(products);
  } else {
    response.sendStatus(404);
  }
};
