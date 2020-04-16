const express = require('express');
const router = express.Router();
const mongooose = require('mongoose');
const Address = require('../model/address');
const User = require('../model/user');
const auth = require('./auth');
const checker = require('./checker');


// add to adresss to db
router.post('/add-address',checker, auth, (req, res, next) => {
  // create address
  const address = new Address({
    _id: new mongooose.Types.ObjectId(),
    name: req.body.name,
    phone: !isNaN(Number(req.body.phone)) ? Number(req.body.phone) : 0 ,
    pincode: !isNaN(Number(req.body.pincode)) ? Number(req.body.pincode) : 0,
    locality: req.body.locality,
    address: req.body.address,
    town: req.body.town,
    state: req.body.state,
    landmark: req.body.landmark,
    addressType: req.body.addressType,
    alternavtivePhone: !isNaN(Number(req.body.alternative)) ? Number(req.body.alternativePhone): 0,
    created: new Date(),
    updated: new Date()
  });
  // save
  address.save().then( data => {
    console.log(data);
    if(!data){
      res.state(500).json({
          result: data,
          success: true,
          message: 'data save problem'
      });
    } else {
      User.updateOne( { _id: req.authID }, { $push: { address: data._id }}).then(data2 => {
        console.log(data2);
        if(!data2){
          res.status(500).json({
            result: data2,
            success: false,
            message: 'problem update address in user profile'
          });
        } else {
          res.status(200).json({
            result: `address: ${data} ///// user.address: ${data2}`,
            success: true,
            message: 'data is save successful'
          });
        }
      });
    }
  } );
});


module.exports = router;
