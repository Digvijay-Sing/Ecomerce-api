const mongoose = require('mongoose');

const categoryScheema = new mongoose.Schema({
    categoryName : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    }
});


const categoryModel = mongoose.model('category' , categoryScheema);


module.exports = categoryModel;

