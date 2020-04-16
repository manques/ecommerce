const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../model/product');


//

// other
const auth = require('./auth');
const checker = require('./checker');
const upload  = require('./mult');
// add product into db
router.post('/add-product',  upload.single('image'), auth, (req, res, next) => {

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: !isNaN(Number(req.body.price)) ? Number(req.body.price) : 0,
    quantity: !isNaN(Number(req.body.quantity)) ? Number(req.body.quantity) : 0,
    image: `http://${req.headers.host}/public/${req.file.filename}`,
    category: req.body.category,
    shortDescription: req.body.shortDescription,
    features: req.body.features,
    longDescription: req.body.longDescription,
    created: new Date(),
    updated: new Date(),
    seller: req.authID
  });
  product.save().then( data => {
    if(data){
      res.status(200).json({
        success: true,
        message: 'product data is successful!!'
      });
    } else {
      console.log(data);
    }
  })

});

// get seller product list

router.get('/seller-product-list', auth, (req, res, next) => {
  Product.find( { seller: req.authID }).then( data => {
    console.log(data);
    if(!data){
      res.status(201).json({
        success: false,
        message: 'products are not found'
      });
    } else {
      res.status(200).json({
        result: data,
        success: true,
        message: 'products find successfully!'
      });
    }
  });
});

// get product by id
router.get('/seller-product/:id', auth, (req, res, next) => {
  console.log('fdffdfdffaffsdaadffsafafaff');
  Product.find({ _id: req.params.id }).then( data => {
    res.status(200).json({
      result: data,
      success: true,
      message: 'fetch product is successful!!'
    });
  });
});


// update product by id
router.post('/update/:_id', upload.single('image'), auth, (req, res, next) => {
    const id = req.params._id;
    console.log(id);
    const updateData = {};
    for(let property in req.body){
      if(property !== 'token'){
        if(property === 'price' || property === 'quantity'){
          updateData[property] = !isNaN(Number(req.body[property])) ? Number(req.body[property])  :   0;
        } else {
          updateData[property] = req.body[property];
        }

      }
    }
    //  check image file
    if(req.file){
      updateData['image'] = `http://${req.headers.host}/public/${req.file.filename}`;
    }
    console.log(updateData);
    Product.updateOne( { _id: id }, { $set: updateData }).then( data => {
      if(data.n === 1){
        res.status(200).json({
          result: data,
          success: true,
          message: 'update successful!!'
        });
      } else {
        res.status(200).json({
          result: data,
          success: false,
          message: 'error'
        });
      }
    });
});


// delete prodcut by id
router.delete('/delete/:id', auth, (req, res, next) => {
  const id = req.params.id;
  console.log(req.params);
   Product.deleteOne( { _id: id}).then( data => {
     console.log(data);
     if(data.n === 1){
      res.status(200).json({
        success: true,
        message: 'deletion succesful!!'
      });
     } else {
      res.status(200).json({
        success: false,
        message: 'deletion succesful!!'
      });
     }
   })
});

// get product for all type of user without auth

router.get('/products', (req, res, next) => {
  Product.find().then( data => {
    if(!data){
      res.status(201).json({
        success: false,
        message: data
      });
    } else {
      res.status(200).json({
        result: data,
        success: true,
        message: 'product fetch successful!!'
      });
    }
  });
});

// fetch product by id
router.get('/product/:id', checker, (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Product.find( { _id: id }).then( data => {
    console.log(data);
    if(!data){
      res.status(200).json({
        success: false,
        message:  'problem of fetch data'
      });
    } else {
      res.status(200).json({
        result: data,
        success: true,
        message: 'fetch product is successful!!'
      });
    }
  });
});


module.exports = router;
