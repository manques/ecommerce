const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  shortDescription: { type: String, required: true },
  features: { type: String },
  longDescription: { type: String },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  seller: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Product', productSchema);
