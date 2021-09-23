import { NextFunction, Request, Response } from 'express';
import { getClass, getModelForClass } from '@typegoose/typegoose';
import CategoryMongo from '../db/mongo/models/category';
import { ICategory, ICategoryMongo, ICategoryPostgre } from '../db/interfaces/category.interface';
import { Query } from 'mongoose';
import { getConnection, getRepository, Repository } from 'typeorm';
import CategoryPostgres from '../db/postgres/entity/category';
let category: ICategory[];
import ProductMongo from '../db/mongo/models/product';

export const categoryMongoHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let category: ICategory;
  let productsForCategory: ICategory[];
  const { id } = req.params;
  const { includeProducts, includeTop3Products } = req.query;
  const categoryModel = getModelForClass(CategoryMongo);
  const productModel = getModelForClass(ProductMongo);
  const query: Query<CategoryMongo, ICategoryMongo> = new Query<CategoryMongo, ICategoryMongo>();
  query.where({ _id: id });
  if (`${includeProducts}` === 'true' && `${includeTop3Products}` !== 'top') {
    category = await categoryModel.findById(id, 'products displayName').lean();
    productsForCategory = await productModel.find({ _id: category.products }, 'displayName price totalRating');
    category['products'] = productsForCategory;
    sendResponse(category, res, next);
  } else if (`${includeTop3Products}` === 'top') {
    category = await categoryModel.findById(id, 'products displayName').lean();
    productsForCategory = await productModel
      .find({ _id: category.products }, 'displayName price totalRating')
      .limit(3)
      .sort({ totalRating: 'DESC' });
    category['products'] = productsForCategory;
    sendResponse(category, res, next);
  }
  if (!includeProducts && !includeTop3Products) {
    category = await categoryModel.findById(id, 'displayName');
    sendResponse(category, res, next);
  }
};
export const categoryPostgreHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const query = getRepository(CategoryPostgres).createQueryBuilder('category');
  const categoryRepository: Repository<ICategoryPostgre> = getConnection().getRepository(CategoryPostgres);
  const { id } = req.params;
  const { includeProducts, includeTop3Products } = req.query;
  query.where({ id });
  if (`${includeProducts}` === 'true' && `${includeTop3Products}` !== 'top') {
    query.innerJoinAndSelect('category.products', 'product');
  } else if (`${includeTop3Products}` === 'top') {
    query.innerJoinAndSelect('category.products', 'product').limit(3).addOrderBy('product.totalRating', 'DESC');
  }
  if (!includeProducts && !includeTop3Products) {
    category = await categoryRepository.findByIds([id]);
    sendResponse(category, res, next);
  } else {
    category = await query.getMany();
    sendResponse(category, res, next);
  }
};

const sendResponse = (category: ICategory[] | ICategory, response: Response, next: NextFunction): void => {
  if (Object.keys(category).length) {
    response.send(category);
  } else {
    response.status(404);
    next(new Error('Category not found'));
  }
};
