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
    } catch (err) {
        res.status(500).send({
            "status": false, "message": err.message
        })
    }
});

//TODO - Login
routes.post('/login', async(req, res) => {
    try {
        userModel.findOne({username: req.body.username}, (err, user) => {
            if (err) throw err

            if (user == null) {
                res.status(500).send({
                    "status": false, "message": "Cannot verify credentials with that username and password."
                })
            } else {
                user.verifyPassword(req.body.password, (err, isMatch) => {
                    if (err) throw err
                    if (isMatch) {
                        res.status(200).send({
                            "status": true, "username": req.body.username, "message": "User logged in successfully."
                        })
                    } else {
                        res.status(500).send({
                            "status": false, "message": "Cannot verify credentials with that username and password."
                        })
                    }
                })
            }
            
        })
        
    } catch (err) {
        res.status(500).send({
            "status": false, "message": err.message
        })
    }
});

// Show all uers for testing purposes
routes.get('/users', async(req, res) => {
    try {
        const allUsers = await userModel.find()
        res.status(200).send({
            all_users: allUsers
        })
    } catch (err) {
        res.status(500).send({
            "status": false, "message": err.message
        })
    }
});

module.exports = routes