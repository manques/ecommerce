const express = require('express');
const router = express.Router();
const checker = require('./checker');
const auth = require('./auth');
const Cart = require('../model/cart');
const User = require('../model/user');
const mongoose = require('mongoose');

router.post('/add-cart', checker, auth, (req, res, next) => {
  User.find( {_id: req.authID } ).populate('cart').then( data => {
    // list of cart id from user
    const cartList = data.cart;
    const cart = new Cart({
      _id: new mongoose.Types.ObjectId(),
      product: req.body._id,
      quantity: Number(req.body.quantity),
    });
    // empty cart list
    if(!data[0].cart.length){
      // save cart item in db
      cart.save().then( data1 => {
        User.updateOne( { _id: req.authID }, { $push: { cart: [data1._id] } }).then( data2 => {
          res.status(200).json({
            result: data2,
            success: true,
            message: 'save cart item successful'
          });
        } );
      });
      //
    } else {
      let oldQty;
      let cartUpdateId
      // check product inside cart or not
      const check = data[0].cart.some( item => {
        if( ((item.product).toString()) === ((req.body._id).toString())){
          oldQty = item.quantity;
          cartUpdateId = item._id;
        }
        return ((item.product).toString()) === ((req.body._id).toString());
      });
      // item exist
      if(check) {
        const newQty = (Number(oldQty) + Number(req.body.quantity)) > 10 ? 10 : (Number(oldQty) + Number(req.body.quantity)) ;
        // update
        Cart.updateOne( { _id: cartUpdateId.toString() }, { $set: { quantity: newQty }} ).then( data4 => {
          res.status(200).json({
            result: data4,
            success: true,
            message: 'update successful'
          });
        });
      } else {
          // save cart item in db
          cart.save().then( data5 => {
            User.updateOne( { _id: req.authID }, { $push: { cart: [data5._id] } }).then( data6 => {
              res.status(200).json({
                result: data6,
                success: true,
                message: 'save cart item successful'
              });
            } );
          });
      }
    }
  });
});


// delete cart item by id
router.delete('/delete/:_id', checker, auth, (req, res, next)=> {
  const _id = req.params._id;
  console.log(_id);
  User.updateOne( { _id: req.authID }, { $pull: { cart: _id }  } ).then( data => {
    console.log('delete in user');
    console.log(data);
    if(data.n) {
      Cart.deleteOne( { _id: _id } ).then( data1 => {
        console.log('delete in cart');
        console.log(data.n);
        if(Number(data.n) === Number(data1.n)){
          console.log(Number(data.n) === Number(data1.n));
          res.status(200).json({
            result: `user cart --->  ${data} cart ---> ${data1}`,
            success: true,
            message: 'cart product delete successful!'
          });
        }
      });
    }
  });
});

module.exports = router;
