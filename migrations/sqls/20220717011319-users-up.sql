/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(50),
  secondname VARCHAR(50),
  password VARCHAR(250)
);