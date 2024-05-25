const mongoose = require('mongoose');


const userScheema = new mongoose.Schema({
    email : {
        required : true,
        type : String
    },
    password : {
        required : true,
        type : String
    },
})

const userModel = mongoose.model('user' , userScheema);


module.exports = userModel;