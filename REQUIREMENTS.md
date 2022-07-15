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
- show all orders [token required]: `'orders:user_id' [GET] (token)`
- Current Order by user [token required]: `'orders/current:userId' [GET] (token)`
- Completed Orders by user [token required]: `'orders/completed:userId' [GET] (token)`
- Active Orders by user [token required]: `'orders/active:userId' [GET] (token)`
- Create Order (args: Order) [token required]: `'orders' [Post] (token)`
- Update order's status (args: status) [token required]: `'orders:id' [PUT] (token)`
- Delete (args: id) [token required]: `'orders/' [DELETE] (token)`

## Data Shapes
#### Product
-  id
- name
- price

```
Table: Product (id:serial[primary key], name:varchar(50)[not null], price:numeric[not null])
```
#### User
- id
- firstName
- secondname
- password

```
Table: User (id:serial[primary key], firstName:varchar(50)[not null], secondname:varchar(50)[not null], password:varchar(60)[not null])
```
#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

```
Table: Orders (id:serial[primary key], product_id:integer(foreign key to products table), quantity:integer[default 1], user_id:integer(foreign key to users table), status:enum(active, complete)[not null])
```
