const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const User = require('../model/user');
const auth = require('./auth');
// nodemailer

const nodemailer = require('nodemailer');


// checker for display req data
const checker = require('./checker');

//  signup request
router.post('/signup', (req, res, next) => {
  console.log(req.body.phone);
  // check email exist
  User.findOne( { email: req.body.email }).then( data => {
    //
    console.log(data);
    if(data) {
      res.status(200).json({
        success: false,
        message: 'email is already exist!!'
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
          res.status(201).json({
            success: false,
            message: err
          });
        } else {
          // save user data in db
          let user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            phone: isNaN(Number(req.body.phone)) ? 0 : Number(req.body.phone),
            password:  hash,
            isSeller: 'true' === req.body.isSeller ? true : false
          });
          user.save().then( signupData => {
            res.status(200).json({
              data: signupData,
              success: true,
              message: 'Register is successful!!'
            });
          });
        }
      });
    }
  });
});

// login user
router.post('/login', (req, res, next) => {


  if(isNaN(Number(req.body.emailPhone))) {
    //  email
    User.findOne( { email: req.body.emailPhone })
        .then( data => {
          console.log(data);
          // email is not exist
          if(!data){
            res.status(201).json({
              success: false,
              message: 'email is not exist!!'
            });
          } else {
            // check password
            console.log(data);
            bcrypt.compare(req.body.password, data.password, (err, result) => {
              if(err) {
                res.status(201).json({
                  success: false,
                  message: 'password is wrong!!'
                });
              } else {
                const token = jwt.sign({ _id: data._id }, process.env.jwtKey, { expiresIn: 60*60 });
                res.status(200).json({
                  token: token,
                  success: true,
                  message: 'login is successful!!'
                });
              }
            });
          }
        });
  } else {
    // phone

  }
});

// get profile
router.get('/profile', auth, (req, res, next) => {

  User.findOne( { _id: req.authID } )
      .populate({ path: 'cart', populate: { path: 'product' } })
      .populate({ path: 'address'})
      .select('name email phone isSeller cart address')
      .then( (result ) => {
    if(!result) {
      res.status(201).json({
        success: false,
        message: 'data is not found'
      });
    } else {
      console.log(result);
      res.status(200).json({
        result: {
          name: result.name,
          email: result.email,
          phone: result.phone,
          isSeller: result.isSeller,
          cart: result.cart,
          address: result.address
        },
        success: true,
        message: 'get profile successful!'
      });
    }
  });
});
// patch isSeller
router.patch('/isSeller', auth, (req, res, next) => {
  User.updateOne( { _id: req.authID }, { $set: { isSeller: req.body.isSeller }}).then( result => {
    if(!result){
      res.status(201).json({
        success: false,
        message: 'data is not found'
      });
    } else {
      res.status(200).json({
        result: result,
        success: true,
        message: 'isSeller update'
      });
    }
  });
});

module.exports  = router;
