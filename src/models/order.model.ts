import db from "../database";

type OrderType = {
  quantity: number;
  user_id: number;
  product_id: number;
  status: string;
};
type OrderReturnType = {
  id: number;
  quantity: number;
  user_id: string;
  product_id: string;
  status: string;
};

class Order {
  table: string = "orders";

  async createOrder(order: OrderType): Promise<OrderReturnType> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO ${this.table} (quantity, user_id, product_id, status) VALUES ($1, $2, $3, $4) RETURNING *`;
      const result = await connection.query(sql, [
        order.quantity,
        order.user_id,
        order.product_id,
        order.status,
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Unable to create order for user (${order.user_id}) cuz ${
          (err as Error).message
        }`
      );
    }
  }

  // Current Orders by user
  async showOrders(userId: number): Promise<OrderReturnType[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * FROM ${this.table} WHERE user_id=$1`;
      const result = await connection.query(sql, [userId]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Error showing order for user ${userId} cuz ${(err as Error).message}`
      );
    }
  }

  // Get current order by user id
  async getCurrentOrderByUserId(userId: number): Promise<OrderReturnType> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * FROM ${this.table} WHERE user_id = ${userId} ORDER BY id DESC LIMIT 1`;
      const result = await connection.query(sql);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Error showing current order for user ${userId} cuz ${
          (err as Error).message
        }`
      );
    }
  }

  // Get active order by user id
  async getActiveOrdersByUserId(userId: number): Promise<OrderReturnType[]> {
    try {
      const status = "active";
      const conn = await db.connect();
      const sql = `SELECT * FROM ${this.table} WHERE user_id = ${userId} AND status = $1`;
      const result = await conn.query(sql, [status]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Error showing active order for user ${userId} cuz ${
          (err as Error).message
        }`
      );
    }
  }

  // select completed order by user id
  async getCompletedOrdersByUserId(userId: number): Promise<OrderReturnType[]> {
    try {
      const status = "complete";
      const conn = await db.connect();
      const sql = `SELECT * FROM ${this.table} WHERE user_id = ${userId} AND status = $1`;
      const result = await conn.query(sql, [status]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Error showing completed orders for user ${userId} cuz ${
          (err as Error).message
        }`
      );
    }
  }

  async updateOrderStatus(
    status: string,
    id: number
  ): Promise<OrderReturnType> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE ${this.table} SET status=$1 WHERE id=$2 RETURNING *`;
      const result = await connection.query(sql, [status, id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Error updating order ${id} cuz ${(err as Error).message}`
      );
    }
  }

  async deleteOrder(id: number): Promise<OrderReturnType> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id]);
      await connection.query(`ALTER SEQUENCE orders_id_seq RESTART WITH ${id}`);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Error deleting order with id ${id} cuz ${(err as Error).message}`
      );
    }
  }
}
export default Order;
