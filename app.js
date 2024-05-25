const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config('.env');
const bodyParser = require('body-parser')


const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/category');
const reviewsRoutes = require('./routes/reviews');
const cartRoutes = require('./routes/cart');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use('/auth' , authRoutes);
app.use('/products' , productRoutes);
app.use('/category' , categoryRoutes);
app.use('/reviews'  , reviewsRoutes);
app.use('/cart'  , cartRoutes);


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("mongo DB connected");

    app.listen(5000, () => {
        console.log('Listening to port 5000');
    })
}).catch((err) => {
    console.log("mongo DB error", err)
})






