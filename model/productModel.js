const mongoose = require('mongoose');
const schema = mongoose.Schema

const productsScheema = new mongoose.Schema({
    title : {
        required : true,
        type : String
    },
    description : {
        required : true,
        type : String
    },
    imageUrl : {
        required : true,
        type : String
    },
    category : {
        required : true,
        type : schema.ObjectId
    },
    price : {
        required : true,
        type : String
    }
})

const productsModel = mongoose.model('products' , productsScheema);


module.exports = productsModel;