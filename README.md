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
  - [License](#license)

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
