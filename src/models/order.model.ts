import db from '../database';

type OrderType = {
  user_id: number;
  status: string;
};
type OrderReturnType = {
  id: number;
  user_id: string;
  status: string;
};

type OrderProduct = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

class Order {
  table: string = 'orders';

  /************************[CRUD operation] ****************************/

  async createOrder(order: OrderType): Promise<OrderReturnType> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO ${this.table} ( user_id, status) VALUES ($1, $2) RETURNING *`;
      const result = await connection.query(sql, [
        order.user_id,
        order.status,
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Unable to create order for user (${order.user_id}) cuz ${
          (err as Error).message
        }`,
      );
    }
  }

  async showOrder(id: number): Promise<OrderReturnType> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * FROM ${this.table} WHERE id=$1`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot Show this order cuz ${err}`);
    }
  }

  async updateOrder(
    id: number,
    order: OrderType,
  ): Promise<OrderReturnType> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE ${this.table} SET user_id=$2, status=$3 WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [
        id,
        order.user_id,
        order.status,
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Error updating order ${id} cuz ${(err as Error).message}`,
      );
    }
  }

  async deleteOrder(id: number): Promise<OrderReturnType> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id]);
      await connection.query(
        `ALTER SEQUENCE orders_id_seq RESTART WITH ${id}`,
      );
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Error deleting order with id ${id} cuz ${
          (err as Error).message
        }`,
      );
    }
  }

  /*********************[User -> Orders]*******************************/

  async getUserOrders(userId: number): Promise<OrderReturnType[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * FROM ${this.table} WHERE user_id=$1`;
      const result = await connection.query(sql, [userId]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Error showing order for user ${userId} cuz ${
          (err as Error).message
        }`,
      );
    }
  }

  async getUserCompletedOrders(
    user_id: number,
  ): Promise<OrderReturnType[]> {
    try {
      const connection = await db.connect();
      const sql =
        'SELECT * FROM orders WHERE user_id=$1 AND status=$2';
      const result = await connection.query(sql, [
        user_id,
        'completed',
      ]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot inset into orders ${err}`);
    }
  }

  async getUserActiveOrders(
    user_id: number,
  ): Promise<OrderReturnType[]> {
    try {
      const connection = await db.connect();
      const sql =
        'SELECT * FROM orders WHERE user_id=$1 AND status=$2';
      const result = await connection.query(sql, [user_id, 'active']);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot inset into orders ${err}`);
    }
  }

  /*********************[Order -> Products]****************************/

  async addOrderProduct(
    orderId: number,
    productId: number,
    quantity: number,
  ): Promise<OrderProduct> {
    try {
      const connection = await db.connect();
      const sql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [
        orderId,
        productId,
        quantity,
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`,
      );
    }
  }

  async getOrderProducts(order_id: number): Promise<OrderProduct[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT p.id as product_id, p.name, p.price, op.quantity FROM products p INNER JOIN order_products op on p.id = op.product_id INNER JOIN orders o on op.order_id = o.id WHERE o.id=$1`;
      const result = await connection.query(sql, [order_id]);
      const orderProducts = result.rows as OrderProduct[];
      connection.release();
      return orderProducts;
    } catch (err) {
      throw new Error(`Cannot get order products ${err}`);
    }
  }

  async deleteOrderProduct(
    orderProductId: number,
  ): Promise<OrderProduct> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM order_products WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [orderProductId]);
      await connection.query(
        `ALTER SEQUENCE order_products_id_seq RESTART WITH ${orderProductId}`,
      );
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error deleting orderProduct cuz ${err}`);
    }
  }
}
export default Order;
