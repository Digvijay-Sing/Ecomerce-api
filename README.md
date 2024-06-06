# E-Commerce API

This is an E-commerce API built with Node.js, Express, and MongoDB. It includes functionalities for user authentication, product management, category management, reviews, and shopping cart operations.

## Table of Contents
- [E-Commerce API](#e-commerce-api)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [Auth Routes](#auth-routes)
    - [Product Routes](#product-routes)
    - [Category Routes](#category-routes)
    - [Review Routes](#review-routes)
    - [Cart Routes](#cart-routes)
  - [Contributing](#contributing)


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/ecommerce-api.git
    cd ecommerce-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add the following variables:
        ```env
        MONGO_URL=your_mongodb_uri
        secret=your_jwt_secret
        ```

4. Start the server:
    ```sh
    npm start
    ```

## Usage

- The server will start on `http://localhost:5000`.
- Use an API client like Postman to interact with the API.

## API Endpoints

### Auth Routes

#### Register a new user
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "password"
    }
    ```
- **Response**:
    ```json
    {
        "message": "User registered",
        "status": 200
    }
    ```

#### Login a user
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "password"
    }
    ```
- **Response**:
    ```json
    {
        "message": "User logged in",
        "status": 200,
        "token": "jwt_token"
    }
    ```

### Product Routes

#### Add a new product
- **URL**: `/products/add`
- **Method**: `POST`
- **Body**:
    ```json
    {
        "title": "Product Title",
        "description": "Product Description",
        "imageUrl": "http://example.com/image.jpg",
        "category": "category_id",
        "price": "100"
    }
    ```
- **Response**:
    ```json
    {
        "message": "Product added",
        "status": 200
    }
    ```

#### List products
- **URL**: `/products/list`
- **Method**: `GET`
- **Query Params**: `sort (-1 (desc) , 1 (asc))`, `category`, `minPrice`, `maxPrice`, `page`, `limit`
- **Response**:
    ```json
    {
        "message": "Products fetched",
        "status": 200,
        "data": [/* array of products */]
    }
    ```

#### Get product details
- **URL**: `/products/:id`
- **Method**: `GET`
- **Response**:
    ```json
    {
        "message": "Product details fetched",
        "status": 200,
        "data": { /* product details with reviews and average rating */ }
    }
    ```

### Category Routes

#### Add a new category
- **URL**: `/category/add`
- **Method**: `POST`
- **Body**:
    ```json
    {
        "categoryName": "Category Name",
        "imageUrl": "http://example.com/image.jpg"
    }
    ```
- **Response**:
    ```json
    {
        "message": "Category added",
        "status": 200
    }
    ```

#### List categories
- **URL**: `/category/list`
- **Method**: `GET`
- **Response**:
    ```json
    {
        "message": "Category List",
        "status": 200,
        "data": [/* array of categories */]
    }
    ```

### Review Routes

#### Add a new review
- **URL**: `/reviews/add`
- **Method**: `POST`
-  **Headers**: 
  ```json
  {
      "Authorization": "Bearer your_jwt_token"
  }
  ```
- **Body**:
    ```json
    {
        "user": "user_id",
        "product": "product_id",
        "rating": 4,
        "review": "Great product!"
    }
    ```
- **Response**:
    ```json
    {
        "message": "Review added",
        "status": 200
    }
    ```

### Cart Routes

#### Add an item to the cart
- **URL**: `/cart/add`
- **Method**: `POST`
-  **Headers**: 
  ```json
  {
      "Authorization": "Bearer your_jwt_token"
  }
  ```
- **Body**:
    ```json
    {
        "user": "user_id",
        "productID": "product_id",
        "quantity": 1
    }
    ```
- **Response**:
    ```json
    {
        "message": "Item added to cart",
        "status": 200,
        "data": { /* cart details */ }
    }
    ```

#### Update cart item quantity
- **URL**: `/cart/update`
- **Method**: `POST`
-  **Headers**: 
    ```json
    {
      "Authorization": "Bearer your_jwt_token"
    }
    ```
- **Body**:
    ```json
    {
        "user": "user_id",
        "productID": "product_id",
        "quantity": 2
    }
    ```
- **Response**:
    ```json
    {
        "message": "Cart updated",
        "status": 200,
        "data": { /* updated cart details */ }
    }
    ```

#### Delete an item from the cart
- **URL**: `/cart/delete`
- **Method**: `POST`
-  **Headers**: 
    ```json
    {
      "Authorization": "Bearer your_jwt_token"
    }
    ```
- **Body**:
    ```json
    {
        "user": "user_id",
        "productID": "product_id"
    }
    ```
- **Response**:
    ```json
    {
        "message": "Cart item deleted",
        "status": 200
    }
    ```

#### List cart items
- **URL**: `/cart/list`
- **Method**: `GET`
- **Headers**: 
    ```json
    {
      "Authorization": "Bearer your_jwt_token"
    }
    ```
- **Response**:
    ```json
    {
        "message": "Cart items",
        "status": 200,
        "data": [/* array of cart items with product details */]
    }
    ```

## Contributing

We welcome contributions to improve the project. Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a Pull Request.
