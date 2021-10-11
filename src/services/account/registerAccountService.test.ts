import postgresConnection from '../../tests/postgresConnection';
import MockExpressRequest from 'mock-express-request';
import MockExpressResponse from 'mock-express-response';
import mongoConnection from '../../tests/mongoConnection';
import RegisterAccountService from './registerAccountService';
import { AccountRepository, run } from '../../db';

beforeAll(async () => {
  await postgresConnection.create();
  await mongoConnection.create();
  await run();
});
beforeEach(async () => {});
afterAll(async () => {
  await postgresConnection.close();
  await mongoConnection.clear();
  await mongoConnection.close();
});

describe('Account registration', () => {
  const body = {
    username: 'testtest',
    password: 'testtest',
    firstName: 'testtest',
    lastName: 'testtest',
  };
  const req = new MockExpressRequest({
    method: 'POST',
    body,
  });
  test('Test account registration', async () => {
    const res = new MockExpressResponse();
    await RegisterAccountService(req, res, jest.fn());
    expect(res.statusCode).toBe(200);
    expect(await AccountRepository.getAccountByUsername(body.username)).not.toBeNull();
  });
  test('Test similar account registration', async () => {
    const res = new MockExpressResponse();
    await RegisterAccountService(req, res, jest.fn());
    expect(res.statusCode).toBe(409);
  });
});
