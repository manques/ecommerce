const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  isSeller: { type: Boolean, required: true },
  cart: [ { type: Schema.Types.ObjectId, ref: 'Cart' } ],
  address: [{ type: Schema.Types.ObjectId, ref: 'Address'}]
});

module.exports = mongoose.model('User', userSchema);
