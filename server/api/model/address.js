const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const addressSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  locality: { type: String, required: true },
  pincode: { type: Number, required: true },
  address: { type: String, required: true },
  town: { type: String, required: true },
  state: { type: String, required: true },
  landmark: { type: String },
  alternativePhone: { type: Number },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Address', addressSchema);
