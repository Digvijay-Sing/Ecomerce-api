const express = require('express');
const router = express.Router();
const productModel = require('../model/productModel')
const mongoose = require('mongoose');


router.post('/add', async (req, res) => {

    const {title , description , imageUrl , category , price} = req.body;

    try {

        const productEsist = await productModel.findOne({title : title})

        if(productEsist){
            return res.status(400).send({message : "Product already exist" , status : 400})
        }

        const newProduct = await productModel.create({title : title, description : description , imageUrl : imageUrl, category : category , price : price})

        return res.status(200).send({message : "Product added" , status : 200})

    } catch (err) {
        console.log(err);
        return res.status(500).send({message : err.message , status : 500})
    }
})


router.get('/list', async (req, res) => {

    let {sort , category ,  minPrice , maxPrice} = req.query;

    if(maxPrice){maxPrice = parseInt(maxPrice)}
    if(minPrice){minPrice = parseInt(minPrice)}

    const page = parseInt(req.query.page) || 1; // Current page, default is 1
    const pageSize = parseInt(req.query.limit) || 10; // Number of items per page, default is 10
    const skip = (page - 1) * pageSize;

    try {



        const pipeline = [
            {
               $match :  category ?  {category : new mongoose.Types.ObjectId(category)}  : {}
            },
            {
                $lookup : {
                    from : 'reviews',
                    localField : '_id',
                    foreignField : 'product',
                     as : 'review'
                }
            },
            {
                $addFields: {
                    averageRating: { $ifNull: [
                        { $avg: "$review.rating" },
                        0
                    ] },
                    priceInt: { $toInt: "$price" }
                }
            },
            {
                $match : minPrice ? {priceInt : {$gte : minPrice}} : {}
            },
            {
                $match : maxPrice ? {priceInt : {$lte : maxPrice}} : {}
            },
            {
                $project : {
                    title : 1,
                    description : 1,
                    imageUrl : 1,
                    price : 1,
                    averageRating: 1,
                }
                
            },
            {
                $skip: skip,
            },
            {
                $limit: pageSize,
            }
        ]

        if (sort) {
            const sortStage = {
                $sort: { priceInt: parseInt(sort) }
            };
            pipeline.splice(3, 0, sortStage); // Add the $sort stage before $skip and $limit
        }


        const productList = await productModel.aggregate(pipeline)


 return res.status(200).send({message : "Products fetched", status : 200 , data : productList})
  

    } catch (err) {
        console.log(err);
        return res.status(500).send({message : err.message , status : 500})
    }
})


router.get('/:id' , async (req, res) => {

      const productId = req.params.id
    try{

        if(!productId){
            return res.status(404).send({message : "Product id is required" , status : 404})
        }

        const productDetails = await productModel.aggregate([
            {
                $match : {
                    _id :  new mongoose.Types.ObjectId(productId)
                }
            },
            {
                $lookup : {
                    from : 'reviews',
                    localField : '_id',
                    foreignField : 'product',
                     as : 'reviews'
                }
            },
            {
                $addFields: {
                    averageRating: { $ifNull: [
                        { $avg: "$review.rating" },
                        0
                    ] },
                }
            },
            {
              $unwind : "$reviews"
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'reviews.user',
                    foreignField: '_id',
                    as: 'reviewer'
                }
            },
            {
                $unwind : "$reviewer"
              },
              {
                $addFields: {
                    "reviews.userEmail": "$reviewer.email"
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    imageUrl: 1,
                    price: 1,
                    averageRating: 1,
                    "reviews.rating": 1,
                    "reviews.review": 1,
                    "reviews.userEmail": 1
                }
            },
            {
                $group: {
                    _id: "$_id",
                    title: { $first: "$title" },
                    description: { $first: "$description" },
                    imageUrl: { $first: "$imageUrl" },
                    price: { $first: "$price" },
                    reviews: { $push: "$reviews" },
                    averageRating: { $first: "$averageRating" }
                }
            }
        ])

        return res.status(200).send({message : "Product details fetched", status : 200 , data : productDetails})

    }catch(err){

    }
})




module.exports = router;