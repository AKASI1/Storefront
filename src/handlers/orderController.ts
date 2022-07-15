import { Application, Request, Response } from "express";
import verifyAuthToken from "../middlewares/verifyAuthToken";
import Order from "../models/order.model";

const order = new Order();

const createOrder = async (req: Request, res: Response) => {
  const newOrder = await order.createOrder(req.body);
  res.json(newOrder);
};

const showOrders = async (req: Request, res: Response) => {
  const orders = await order.showOrders(parseInt(req.params.userId));
  res.json(orders);
};

const getCurrentOrderByUserId = async (req: Request, res: Response) => {
  const orders = await order.getCurrentOrderByUserId(
    parseInt(req.params.userId)
  );
  res.json(orders);
};

const getActiveOrdersByUserId = async (req: Request, res: Response) => {
  const orders = await order.getActiveOrdersByUserId(
    parseInt(req.params.userId)
  );
  res.json(orders);
};

const getCompletedOrdersByUserId = async (req: Request, res: Response) => {
  const orders = await order.getCompletedOrdersByUserId(
    parseInt(req.params.userId)
  );
  res.json(orders);
};

const updateOrderStatus = async (req: Request, res: Response) => {
  const orders = await order.updateOrderStatus(
    req.body.status,
    parseInt(req.params.id)
  );
  res.json(orders);
};

const deleteorder = async (req: Request, res: Response) => {
  const orders = await order.deleteOrder(req.body.orderId);
  res.json(orders);
};

const orderRoutes = (app: Application) => {
  app
    .route("/orders")
    .post(verifyAuthToken, createOrder)
    .delete(verifyAuthToken, deleteorder);
  app.get("/orders:userId", verifyAuthToken, showOrders);
  app.get("/orders/current:userId", verifyAuthToken, getCurrentOrderByUserId);
  app.get("/orders/active:userId", verifyAuthToken, getActiveOrdersByUserId);
  app.get(
    "/orders/completed:userId",
    verifyAuthToken,
    getCompletedOrdersByUserId
  );
  app.route("orders:id").put(verifyAuthToken, updateOrderStatus);
};

export default orderRoutes;
