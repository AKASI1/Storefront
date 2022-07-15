import "dotenv/config";
import { Pool } from "pg";

const db = new Pool({
  host: process.env.host,
  database: process.env.database,
  user: process.env.user,
});

export default db;
