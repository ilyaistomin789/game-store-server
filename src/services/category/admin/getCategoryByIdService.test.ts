import postgresConnection from '../../../tests/postgresConnection';
import mongoConnection from '../../../tests/mongoConnection';
import { run } from '../../../db';
import { DB } from '../../../config/config';
import { ICategory } from '../../../db/interfaces/category.interface';
import MockExpressRequest from 'mock-express-request';
import MockExpressResponse from 'mock-express-response';
import GetCategoryByIdService from './getCategoryByIdService';
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

describe('Test getting category by Id', () => {
  test('Get category by correct Id', async () => {
    const id = DB === 'mongo' ? category._id : category.id;
    const req = new MockExpressRequest({
      method: 'GET',
      params: { id },
    });
    const res = new MockExpressResponse();
    await GetCategoryByIdService(req, res, jest.fn());
    expect(res.statusCode).toBe(200);
  });
  test('Get category by wrong Id', async () => {
    const req = new MockExpressRequest({
      method: 'GET',
      params: { id: '123' },
    });
    const res = new MockExpressResponse();
    await GetCategoryByIdService(req, res, jest.fn());
    expect(res.statusCode).toBe(400);
  });
});
