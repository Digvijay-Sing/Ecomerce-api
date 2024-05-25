const express = require('express');
const router = express.Router();
const cartModel = require('../model/cartModel');
const authWithUser = require('../middlewares/authWithGetUser');
const productsModel = require('../model/productModel');
const mongoose = require('mongoose');


router.post('/add', authWithUser, async (req, res) => {

    const { user, productID, quantity } = req.body;
    try {
        let cart = await cartModel.findOne({ user: user })
        if (!cart) {
            cart = new cartModel({ user: user, items: [] })
        }

        const product = await productsModel.findById(productID );
        if (!product) {
            return res.status(404).send({ message: "product not found", status: 404 })
        }

        const existingItem = cart.items.find(item => item.product.toString() == productID);
        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            cart.items.push({ product: new mongoose.Types.ObjectId(productID), quantity: quantity });
        }

        await cart.save()

        return res.status(200).send({ message: "Item added to cart", status: 200, data: cart })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: err.message, status: 500 })
    }
})


router.post('/update' , authWithUser , async (req, res) => {
    const { user, productID, quantity } = req.body;

    try{
        let cart = await cartModel.findOne({user : user})
        if (!cart) {
            return res.status(404).send({ message: "Cart not found", status: 404 })
        }

        let product = await productsModel.findById(productID);
        if (!product) {
            return res.status(404).send({ message: "Product not found", status: 404 })
        }

        let item = cart.items.find(item => item.product == productID);
        if (!item) {
            return res.status(404).send({ message: 'Item not found in cart', status: 404 });
        }

        item.quantity = quantity;
        await cart.save();
        return res.status(200).send({ message: 'Cart updated', status: 200, data: cart });

    }catch (err) {
        console.log(err);
        return res.status(500).send({ message: err.message, status: 500 });
    }

})


router.post('/delete' , authWithUser , async (req, res) => {
    const { user, productID, quantity } = req.body;

    try{

        let cart = await cartModel.findOne({user : user})
        if (!cart) {
            return res.status(404).send({ message: "Cart not found", status: 404 })
        }

        let product = await productsModel.findById(productID);
        if (!product) {
            return res.status(404).send({ message: "Product not found", status: 404 })
        }

        let itemIndex = cart.items.findIndex(item => item.product == productID);
        if (itemIndex == '-1') {
            return res.status(404).send({ message: 'Item not found in cart', status: 404 });
        }

        cart.items.splice(itemIndex , 1)

        if(cart.items.length == 0){
            await cartModel.deleteOne({user : user})
        }

        return res.status(200).send({ message: 'Cart  item deleted', status: 200 });

    }catch(err){
        console.log(err);
        return res.status(500).send({ message: err.message, status: 500 });
    }
})

router.get('/list' ,authWithUser ,  async (req, res) => {

    const {user} = req.body;

    try{


        const cartItems = await cartModel.aggregate([
            {
                $match : {
                    user : user
                }
            },
            {
                $unwind : "$items"
            },
            {
                $lookup : {
                    from : "products",
                    localField : "items.product",
                    foreignField : "_id",
                    as : "productDetails"
                }
            },
            {
                $unwind : "$productDetails"
            },
            {
                $project : {
                    _id : 1,
                    quantity : "$items.quantity",
                    productTitle : "$productDetails.title",
                    productId : "$productDetails._id",
                    pricePerProduct : "$productDetails.price",
                    productImage : "$productDetails.imageUrl"
                }
            }
        ])

        return res.status(200).send({ message: 'Cart  items', status: 200 , data : cartItems });

        
    }catch(err){
        console.log(err);
        return res.status(500).send({ message: err.message, status: 500 });  
    }

})

module.exports = router;