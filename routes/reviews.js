const express = require('express');
const router = express.Router();
const reviewModel = require('../model/reviewModel')
const authWithUser = require('../middlewares/authWithGetUser')


router.post('/add', authWithUser , async (req, res) => {

    const { user, product, rating, review } = req.body;

    console.log(req.body);

    try {

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).send({ message: 'Rating must be between 1 and 5.', status: 400 });
        }

        const newReview = await reviewModel.create({ user, product, rating, review })

        return res.status(200).send({ message: "Review added", status: 200 })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: err.message, status: 500 })
    }
})

// router.get('/list', async (req, res) => {
//     try {
//         const categoryList = await categoryModel.find()
//         return res.json({message : "Category List" , status : 200 , data : categoryList})
//     } catch (err) {
//         console.log(err);
//         return res.json({message : err.message , status : 500})
//     }
// })


module.exports = router;