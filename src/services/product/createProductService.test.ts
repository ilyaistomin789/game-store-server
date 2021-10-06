import { ICategory } from '../../db/interfaces/category.interface';
import postgresConnection from '../../tests/postgresConnection';
import mongoConnection from '../../tests/mongoConnection';
import { ProductRepository, run } from '../../db';
import { DB } from '../../config/config';
import MockExpressRequest from 'mock-express-request';
import MockExpressResponse from 'mock-express-response';
import CreateProductService from './createProductService';

let category: ICategory;
beforeAll(async () => {
  await postgresConnection.create();
  await mongoConnection.create();
  await run();
  category = DB === 'mongo' ? await mongoConnection.initCategory() : await postgresConnection.initCategory();
});
afterAll(async () => {
  await postgresConnection.clear();
  await postgresConnection.close();
  await mongoConnection.clear();
  await mongoConnection.close();
});

describe('Test creating product', () => {
  test('Create product with correct data', async () => {
    const body = {
      displayName: 'test',
      totalRating: 6,
      price: 6.99,
      categories: DB === 'mongo' ? [category._id] : [category.id],
    };
    const req = new MockExpressRequest({
      method: 'POST',
      body,
    });
    const res = new MockExpressResponse();
    await CreateProductService(req, res, jest.fn());
    expect(res.statusCode).toBe(200);
    expect((await ProductRepository.getProduct()).length).toBe(1);
  });
  test('Create product with wrong data', async () => {
    const body = {
      displayName: 'test',
      totalRating: '1w2w3',
      price: 6.99,
      categories: DB === 'mongo' ? [category._id] : [category.id],
    };
    const req = new MockExpressRequest({
      method: 'POST',
      body,
    });
    const res = new MockExpressResponse();
    await CreateProductService(req, res, jest.fn());
    expect(res.statusCode).toBe(400);
    expect((await ProductRepository.getProduct()).length).toBe(1);
  });
});
