import postgresConnection from '../../../tests/postgresConnection';
import mongoConnection from '../../../tests/mongoConnection';
import MockExpressRequest from 'mock-express-request';
import GetProductByIdService from './getProductByIdService';
import MockExpressResponse from 'mock-express-response';
import { IProduct } from '../../../db/interfaces/product.interface';
import { run } from '../../../db';
import { DB } from '../../../config/config';
let product: IProduct;
beforeAll(async () => {
  await postgresConnection.create();
  await mongoConnection.create();
  await run();
  product = DB === 'mongo' ? await mongoConnection.initProduct() : await postgresConnection.initProduct();
});
afterAll(async () => {
  await postgresConnection.clear();
  await postgresConnection.close();
  await mongoConnection.clear();
  await mongoConnection.close();
});
describe('Test getting product by Id', () => {
  test('Get Product by correct Id', async () => {
    const id = DB === 'mongo' ? product._id : product.id;
    const req = new MockExpressRequest({
      method: 'GET',
      params: { id },
    });
    const res = new MockExpressResponse();
    await GetProductByIdService(req, res, jest.fn());
    expect(res.statusCode).toBe(200);
  });
  test('Get Product by wrong Id', async () => {
    const req = new MockExpressRequest({
      method: 'GET',
      params: { id: '123d' },
    });
    const res = new MockExpressResponse();
    await GetProductByIdService(req, res, jest.fn());
    expect(res.statusCode).toBe(400);
  });
});
