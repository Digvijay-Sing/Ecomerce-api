const mongoose = require('mongoose');
const schema = mongoose.Schema


const reviewsScheema = new mongoose.Schema({
    user : {
        type : schema.ObjectId,
        required : true
    },
    product : {
        type : schema.ObjectId,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    review : {
        type : String,
        required : true
    }
})

const reviewsModel = mongoose.model('reviews'  , reviewsScheema);

module.exports = reviewsModel;