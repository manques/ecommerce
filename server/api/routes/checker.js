module.exports = function (req, res, next) {
  console.log('--------req-----------');
  console.log(req);
  console.log('--------params-----------');
  console.log(req.params);
  console.log('----------body----------');
  console.log(req.body);
  console.log('----------headers----------');
  console.log(req.headers);
  console.log('----------file----------');
  console.log(req.file);
  next();
}
