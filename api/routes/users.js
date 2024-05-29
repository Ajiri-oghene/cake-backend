const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
// const checkAuth = require('../middleware/check-auth');


router.get('/', async(req, res) =>{
    User
    .find()
    .select('-password')
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            products: docs.map(doc =>{
                return {
                    _id: doc._id,
                    name: doc.name,
                    email: doc.email,
                    password: doc.password,
                    phone: doc.phone,
                    isAdmin: doc.isAdmin,
                    id: doc.id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8000/api/e-store/users/' + doc._id
                    }
                }
            })
        })
    })
});// working

router.post('/signup', async(req, res, next) => {
    //http://localhost:5000/api/e-store/users
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
    });
    user
    .save()
    .then(result =>{
        res.status(201).json({
            createdUser: {
                name: result.name,
                email: result.email,
                password: result.password,
                phone: result.phone,
                isAdmin: result.isAdmin,
                id: result.id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8000/api/eazy_cakes/users/' + result._id 
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: "Sign up failed"
        })
    });
    
});

router.get('/:userId', (req, res, next) =>{
    //http://localhost:5000/api/e-store/user/id
    User.findById({_id: req.params.userId})
    .select('-password -passwordHash')
    .then(user => {
        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        } else{
            res.status(200).json({
                user: user,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8000/api/eazy_cakes/category'
                }
            })
        }
    })    
    .catch(err => {
        res.status(500).json({
            message: "Unable to get user",
            error: err
        })
    });
});

router.post('/login', (req, res, next) =>{
    // http://localhost:3000/users/login
    // {
    //     "email": "ajiri35@gmail.com",
    //     "password": "444444"
    // }
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length <1){
            return res.status(401).json({
                message: "Auth failed"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
            if (err) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id,
                    isAdmin: user[0].isAdmin
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
                )
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }
            return res.status(401).json({
                message: "Auth failed"
            });
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});// working

router.delete('/:userId', (req, res, next) =>{
    //http://localhost:5000/api/e-store/user/id
    User.findByIdAndDelete({_id: req.params.userId})
    .then(user => {
        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "User deleted"
        })
    })    
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});
// implement isadmin properties in delete and get



module.exports = router;