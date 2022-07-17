import db from '../database';

type ProductType = { name: string; price: number };
type ProductReturnType = { id: number; name: string; price: number };

class Product {
  table: string = 'products';

  async createProduct(
    product: ProductType,
  ): Promise<ProductReturnType> {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO ${this.table} (name, price) VALUES ($1, $2) RETURNING *`;
      const result = await connection.query(sql, [
        product.name,
        product.price,
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Unable to create (${product.name}) cuz ${
          (err as Error).message
        }`,
      );
    }
  }

  async showProducts(): Promise<ProductReturnType[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * FROM ${this.table}`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Error showing products cuz ${(err as Error).message}`,
      );
    }
  }

  async getProduct(id: number): Promise<ProductReturnType> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * FROM ${this.table} WHERE id=$1`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Error showing the product ${id} cuz ${
          (err as Error).message
        }`,
      );
    }
  }

  async deleteProduct(id: number): Promise<ProductReturnType> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id]);
      await connection.query(
        `ALTER SEQUENCE products_id_seq RESTART WITH ${id}`,
      );
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Error deleting product ${id} cuz ${(err as Error).message}`,
      );
    }
  }
}

export default Product;
