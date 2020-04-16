const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  let token = req.headers.authorization ? req.headers.authorization.slice(7) : req.body.token.slice(7);
  jwt.verify(token, process.env.jwtKey, (err, decoded) => {
    if(err) {
      res.status(201).json({
        result: err.name,
        success: false,
        message: err.message
      });
    } else {
      req.authID = decoded._id;
      console.log('--=======================================');
      next();
    }
  })
}
