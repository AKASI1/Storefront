import { Application, Request, Response } from 'express';
import verifyAuthToken from '../middlewares/verifyAuthToken';
import Product from '../models/product.model';

const product = new Product();

const createProduct = async (req: Request, res: Response) => {
  const newProduct = await product.createProduct(req.body);
  res.json(newProduct);
};

const showProducts = async (_req: Request, res: Response) => {
  const products = await product.showProducts();
  res.json(products);
};

const getProduct = async (req: Request, res: Response) => {
  const products = await product.getProduct(parseInt(req.params.id));
  res.json(products);
};

const deleteProduct = async (req: Request, res: Response) => {
  const products = await product.deleteProduct(
    parseInt(req.params.id),
  );
  res.json(products);
};

const productRoutes = (app: Application) => {
  app
    .route('/products')
    .get(showProducts)
    .post(verifyAuthToken, createProduct);
  app
    .route('/products/:id')
    .get(getProduct)
    .delete(verifyAuthToken, deleteProduct);
};

export default productRoutes;
