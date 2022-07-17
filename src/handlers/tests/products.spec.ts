import supertest from 'supertest';
import 'dotenv/config';
import app from '../../server';
import jwt from 'jsonwebtoken';

const token = jwt.sign('AhmedKASI', process.env.JWT_SECRET as string);
const request = supertest(app);

const productInstance = {
  name: 'strawberry',
  price: 8,
};

describe('Product Handler', () => {
  it('should return success for CREATE product', async () => {
    const response = await request
      .post('/products')
      .auth(token, { type: 'bearer' })
      .send(productInstance);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it('should return success for READ all products', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it('should return success for READ product by id', async () => {
    const response = await request.get('/products/1');

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it('should return success for DELETE product by productId', async () => {
    const response = await request
      .delete('/products/1')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(200);
  });
});
