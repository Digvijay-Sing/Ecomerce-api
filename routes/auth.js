const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken')



router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const saltRounds = 10;
    try {

        const userFound = await userModel.findOne({ email: email});

        if(userFound){
          return res.status(500).send({message : "User already registered" , status : 500})
        }

        // Generate a salt
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash password
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({ email: email, password: hashedPassword});

        return res.status(200).send({message : "User registered" , status : 200})

    } catch (err) {
        console.log(err);
        return res.status(500).send({message : err.message , status : 500})
    }
})



router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {

        const userFound = await userModel.findOne({ email: email});

        if(!userFound){
          return res.status(500).send({message : "User not registered" , status : 500})
        }

        const isMatch = await bcrypt.compare(password, userFound.password);

        if(!isMatch){
          return res.status(500).send({message : "Invalid password" , status : 500})
        }

        console.log(userFound);

        const token = jwt.sign({
            email : userFound.email,
            password : userFound.password
        } , process.env.secret)

        return res.status(200).send({message : "User logged in" , status : 200 , token : token})

    } catch (err) {
        console.log(err);
        return res.status(500).send({message : "Login Failed" , status : 500 })
    }
})

module.exports = router;