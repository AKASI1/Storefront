import 'dotenv/config';
import { Pool } from 'pg';

const db = new Pool({
  host: process.env.host,
  database:
    process.env.NODE_ENV === 'dev'
      ? process.env.database
      : process.env.test_db,
  user: process.env.user,
  password: process.env.password,
});

export default db;
