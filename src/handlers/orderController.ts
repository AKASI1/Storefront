import { Application, Request, Response } from 'express';
import verifyAuthToken from '../middlewares/verifyAuthToken';
import Order from '../models/order.model';

const order = new Order();

type OrderType = { product_id: number; quantity: number };

const createOrder = async (req: Request, res: Response) => {
  const newOrder = await order.createOrder(req.body);
  res.json(newOrder);
};

const showOrder = async (req: Request, res: Response) => {
  const orders = await order.showOrder(parseInt(req.params.id));
  res.json(orders);
};

const getUserOrders = async (req: Request, res: Response) => {
  const orders = await order.getUserOrders(
    parseInt(req.params.userId),
  );
  res.json(orders);
};

const getUserActiveOrders = async (req: Request, res: Response) => {
  const orders = await order.getUserActiveOrders(
    parseInt(req.params.userId),
  );
  res.json(orders);
};

const getUserCompletedOrders = async (
  req: Request,
  res: Response,
) => {
  const orders = await order.getUserCompletedOrders(
    parseInt(req.params.userId),
  );
  res.json(orders);
};

const updateOrder = async (req: Request, res: Response) => {
  const orders = await order.updateOrder(
    parseInt(req.params.id),
    req.body,
  );
  res.json(orders);
};

const deleteorder = async (req: Request, res: Response) => {
  const orders = await order.deleteOrder(parseInt(req.params.id));
  res.json(orders);
};

const addOrderProduct = async (req: Request, res: Response) => {
  try {
    const orderId: number = parseInt(req.params.id);
    const payload = req.body.products;

    payload.forEach(async (item: OrderType) => {
      await order.addOrderProduct(
        orderId,
        item.product_id,
        item.quantity,
      );
    });

    const products = await order.getOrderProducts(orderId);
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const getOrderProducts = async (req: Request, res: Response) => {
  try {
    const orderId: number = parseInt(req.params.id);
    const products = await order.getOrderProducts(orderId);
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const deleteOrderProduct = async (req: Request, res: Response) => {
  try {
    await order.deleteOrderProduct(parseInt(req.params.id));
  } catch (err) {
    res.status(400).json({ err });
  }
};

const orderRoutes = (app: Application) => {
  app.post('/order', verifyAuthToken, createOrder);
  app
    .route('/order/:id')
    .get(verifyAuthToken, showOrder)
    .put(verifyAuthToken, updateOrder)
    .delete(verifyAuthToken, deleteorder);
  app.get('/orders/:userId', verifyAuthToken, getUserOrders);
  app.get(
    '/orders/completed/:userId',
    verifyAuthToken,
    getUserCompletedOrders,
  );
  app.get(
    '/orders/active/:userId',
    verifyAuthToken,
    getUserActiveOrders,
  );
  app
    .route('/order/:id/products')
    .get(verifyAuthToken, getOrderProducts)
    .post(verifyAuthToken, addOrderProduct);
  app.delete(
    '/orderProduct/:id',
    verifyAuthToken,
    deleteOrderProduct,
  );
};

export default orderRoutes;
