const express = require('express')
const userModel = require('../models/userModel');
const routes = express.Router()

//TODO - Sign Up
routes.post('/signup', async (req, res) => {
    try {
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({
            created_user: newUser
        })
    } catch (error) {
        res.status(500).send({
            "status": false, "message": err.message
        })
    }
});

//TODO - Login
routes.get('/login', async(req, res) => {
    try {
        const username = await userModel.findOne({username: req.params.username}, (err, user) => {
            if (err) throw err

            user.verifyPassword(req.params.password, (isMatch) => {
                if (err) throw err
                res.status(200).send({
                    verified_user: username
                })
            })
        })
    } catch (error) {
        res.status(500).send({
            "status": false, "message": err.message
        })
    }
});

module.exports = routes