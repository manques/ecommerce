const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  _id: Schema.Types.ObjectId,
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Cart', cartSchema);
