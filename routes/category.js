const express = require('express');
const router = express.Router();
const categoryModel = require('../model/categoryModel')


router.post('/add', async (req, res) => {

    const {categoryName , imageUrl } = req.body;

    try {
        const categoryList = await categoryModel.findOne({categoryName : categoryName})

        if(categoryList){
            return res.status(400).send({message : "Category already exist" , status : 400})
        }

        const newCategory = await categoryModel.create({categoryName : categoryName , imageUrl : imageUrl})

        return res.status(200).send({message : "Category added" , status : 200})

    } catch (err) {
        console.log(err);
        return res.status(500).send({message : err.message , status : 500})
    }
})

router.get('/list', async (req, res) => {
    try {
        const categoryList = await categoryModel.find()
        return res.status(200).send({message : "Category List" , status : 200 , data : categoryList})
    } catch (err) {
        console.log(err);
        return res.status(500).send({message : err.message , status : 500})
    }
})


module.exports = router;