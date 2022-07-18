# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- show all products: `'products/' [GET]`
- get product by id: `'products/:id' [GET]`
- Create (args: Product)[token required]: `'products/' [POST] (token)`
- Delete (args: id) [token required]: `'products/  [DELETE] (token)`

#### Users
- show all users [token required]: `'users/' [GET] (token)`
- get user by id [token required]: `'users/:id' [GET] (token)`
- Create (args: User): `'register/' [POST]`
- login (args: id, password): `'login/' [Post]`
- Delete (args: id) [token required]: `'users/' [DELETE] (token)`

#### Orders
- Show All User Orders [token required]: `'orders/:userId' [GET] (token)`
- Completed User Orders [token required]: `'orders/completed/:userId' [GET] (token)`
- Active User Orders [token required]: `'orders/active/:userId' [GET] (token)`
- Create Order (args: Order) [token required]: `'order/' [Post] (token)`
- Show Order [token required]: `'order/:id' [POST] (token)`
- Update Order (args: Order) [token required]: `'order/:id' [PUT] (token)`
- Delete [token required]: `'order/:id' [DELETE] (token)`
- Add Products (args: Products[]) [token required]: `'order/:id/products' [POST] (token)`
- Get Products [token required]: `'order/:id/products' [GET] (token)`
- Delete Products [token required]: `'orderProduct/:id' [DELETE] (token)`

## Data Shapes
#### products
-  id
- name
- price

```
Table: products (id:serial[primary key], name:varchar(50)[not null], price:numeric[not null])
```
#### users
- id
- firstName
- secondname
- password

```
Table: users (id:serial[primary key], firstname:varchar(50)[not null], secondname:varchar(50)[not null], password:varchar(60)[not null])
```
#### orders
- id
- user_id
- status of order (active or complete)

```
Table: orders (id:serial[primary key], user_id:integer(foreign key to users table), status:enum(active, complete)[not null])
```
#### order_products
- id
- order_id
- product_id
- quantity

```
Table: order_products (id:serial[primary key], order_id:integer(foreign key to orders table), product_id:integer(foreign key to products table), quantity:integer)
```
