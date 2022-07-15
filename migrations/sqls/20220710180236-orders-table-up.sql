/* Replace with your SQL commands */
CREATE TYPE mood AS ENUM ('active', 'complete');
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  quantity INTEGER DEFAULT 1,
  user_id BIGINT REFERENCES users(id),
  product_id BIGINT REFERENCES products(id),
  status mood NOT NULL
);