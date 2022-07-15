import db from "../database";
import bcrypt from "bcrypt";
import "dotenv/config";

type UserType = {
  firstname: string;
  secondname: string;
  password: string;
};
type UserReturnType = {
  id: number;
  firstname: string;
  secondname: string;
};

class User {
  table: string = "users";

  async createUser(user: UserType): Promise<UserType> {
    try {
      const salt = await bcrypt.genSalt(parseInt(process.env.salt as string));
      const hashedPass: string = bcrypt.hashSync(
        user.password + process.env.pepper,
        salt
      );
      const connection = await db.connect();
      const sql = `INSERT INTO ${this.table} (firstname, secondname, password) VALUES ($1, $2, $3) RETURNING id, firstname, secondname`;
      const result = await connection.query(sql, [
        user.firstname,
        user.secondname,
        hashedPass,
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Unable to create (${user.firstname}) cuz ${(err as Error).message}`
      );
    }
  }

  async showUsers(): Promise<UserReturnType[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT id, firstname, secondname FROM ${this.table}`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error showing users cuz ${(err as Error).message}`);
    }
  }

  async getUser(id: number): Promise<UserReturnType> {
    try {
      const connection = await db.connect();
      const sql = `SELECT id, firstname, secondname FROM ${this.table} WHERE id=$1`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Error showing the user by id ${id} cuz ${(err as Error).message}`
      );
    }
  }

  async deleteUser(id: number): Promise<UserReturnType> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING id, firstname, secondname`;
      const result = await connection.query(sql, [id]);
      await connection.query(`ALTER SEQUENCE users_id_seq RESTART WITH ${id}`);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Error deleting user with id ${id} cuz ${(err as Error).message}`
      );
    }
  }

  async authenticateUser(
    id: number,
    pass: string
  ): Promise<UserReturnType | null> {
    try {
      const connection = await db.connect();
      const sql = `SELECT password FROM ${this.table} WHERE id=$1`;
      const result = await connection.query(sql, [id]);

      if (result.rows.length) {
        const { password: hashedPass } = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(
          pass + process.env.pepper,
          hashedPass
        );
        if (isPasswordValid) {
          const userInfo = await connection.query(
            `SELECT id, firstname, secondname FROM ${this.table} WHERE id=$1`,
            [id]
          );
          return userInfo.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (err) {
      throw new Error(
        `Unable to Login cuz of error: ${(err as Error).message}`
      );
    }
  }
}

export default User;
