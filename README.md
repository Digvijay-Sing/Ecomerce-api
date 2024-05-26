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
        MONGODB_URI=your_mongodb_uri
        JWT_SECRET=your_jwt_secret
        ```

4. Start the server:
    ```sh
    npm start
    ```
