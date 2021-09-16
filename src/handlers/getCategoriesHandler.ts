import { Request, Response } from 'express';
import { getClass, getModelForClass } from '@typegoose/typegoose';
import CategoryMongo from '../db/mongo/models/category';
import { ICategory, ICategoryMongo, ICategoryPostgre } from '../db/interfaces/category.interface';
import { Query } from 'mongoose';
import { getConnection, getRepository, Repository } from 'typeorm';
import CategoryPostgres from '../entity/category';
let category: ICategory[];
import ProductMongo from '../db/mongo/models/product';

export const categoryMongoHandler = async (request: Request, response: Response): Promise<void> => {
  let category: ICategory;
  let productsForCategory: ICategory[];
  const { id } = request.params;
  const { includeProducts, includeTop3Products } = request.query;
  const categoryModel = getModelForClass(CategoryMongo);
  const productModel = getModelForClass(ProductMongo);
  const query: Query<CategoryMongo, ICategoryMongo> = new Query<CategoryMongo, ICategoryMongo>();
  query.where({ _id: id });
  if (`${includeProducts}` === 'true' && `${includeTop3Products}` !== 'top') {
    category = await categoryModel.findById(id, 'products displayName').lean();
    productsForCategory = await productModel.find({ _id: category.products }, 'displayName price totalRating');
    category['products'] = productsForCategory;
    sendResponse(category, response);
  } else if (`${includeTop3Products}` === 'top') {
    category = await categoryModel.findById(id, 'products displayName').lean();
    productsForCategory = await productModel
      .find({ _id: category.products }, 'displayName price totalRating')
      .limit(3)
      .sort({ totalRating: 'DESC' });
    category['products'] = productsForCategory;
    sendResponse(category, response);
  }
  if (!includeProducts && !includeTop3Products) {
    category = await categoryModel.findById(id, 'displayName');
    sendResponse(category, response);
  }
};
export const categoryPostgreHandler = async (request: Request, response: Response): Promise<void> => {
  const query = getRepository(CategoryPostgres).createQueryBuilder('category');
  const categoryRepository: Repository<ICategoryPostgre> = getConnection().getRepository(CategoryPostgres);
  const { id } = request.params;
  const { includeProducts, includeTop3Products } = request.query;
  query.where({ id });
  if (`${includeProducts}` === 'true' && `${includeTop3Products}` !== 'top') {
    query.innerJoinAndSelect('category.products', 'product');
  } else if (`${includeTop3Products}` === 'top') {
    query.innerJoinAndSelect('category.products', 'product').limit(3).addOrderBy('product.totalRating', 'DESC');
  }
  if (!includeProducts && !includeTop3Products) {
    category = await categoryRepository.findByIds([id]);
    sendResponse(category, response);
  } else {
    category = await query.getMany();
    sendResponse(category, response);
  }
};

const sendResponse = (category: ICategory[] | ICategory, response: Response): void => {
  if (category !== null) {
    response.send(category);
  } else {
    response.sendStatus(404);
  }
};
