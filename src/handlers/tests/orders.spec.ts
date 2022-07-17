import supertest from 'supertest';
import 'dotenv/config';
import app from '../../server';
import jwt from 'jsonwebtoken';

const userInstance = {
  firstname: 'test',
  lastname: 'test2',
  password: 'CpsodK3918',
};

const token = jwt.sign('AhmedKASI', process.env.JWT_SECRET as string);
const request = supertest(app);

describe('Order Handler', () => {
  beforeAll(async () => {
    await request.post('/register').send(userInstance);
  });
  it('should return success for CREATE order', async () => {
    const response = await request
      .post('/order')
      .auth(token, { type: 'bearer' })
      .send({
        user_id: 1,
        status: 'active',
      });

    expect(response.status).toBe(200);
  });

  it('should return success for READ orders by user id', async () => {
    const response = await request
      .get('/order/1')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it('should return success for DELETE order by order id', async () => {
    const response = await request
      .delete('/order/1')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(200);
  });

  it('should return success for get order products', async () => {
    const response = await await request
      .get('/order/1/products')
      .auth(token, { type: 'bearer' });
    expect(response.status).toBe(200);
  });
  afterAll(async () => {
    await request.delete('/users/1').auth(token, { type: 'bearer' });
  });
});
