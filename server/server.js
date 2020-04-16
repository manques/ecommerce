const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

mongoose.Promise  = global.Promise;
// import other file
const userRoutes = require('./api/routes/user');
const productRoutes = require('./api/routes/product');
const cartRoutes = require('./api/routes/cart');
const addressRoutes = require('./api/routes/address');

//connect to mongoose
mongoose.connect(`mongodb://${process.env.dbUsername}:${process.env.dbPassword}@ds113923.mlab.com:13923/ecommerce`,
                  { useNewUrlParser: true, useUnifiedTopology: true },
                   () => {
                    console.log('coneect to db');
                  });

// add cors
app.use(cors());
// add body-parser
app.use(express.json());
// add urlencoded
app.use(express.urlencoded({ extended: true }));
// port


// add routes
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/address', addressRoutes);
app.use('/public', express.static( '../server/api/routes/uploaded'));



const port = process.env.PORT || 8000;
// add create server & add port

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});

